import '../css/style.css';
import moviesList from './views/moviesList';
import posterBg from './views/posterBg';
import modal from './views/modal';
import pagination from './views/pagination';
import moviesData from './store/movies';
import notifyView from './views/notifyAlert';
import loader from './views/loader';

document.addEventListener('DOMContentLoaded', () => {
  init();

  // Elements
  const movieContainer = document.querySelector('.movies-container .row');
  const paginationContainer = document.querySelector('.pagination');
  const searchInput = document.querySelector('nav .search');
  const modalContainer = document.querySelector('.modal-container');
  // Events
  movieContainer.addEventListener('mouseover', onChangeBg);
  movieContainer.addEventListener('click', onShowModal);
  paginationContainer.addEventListener('click', onChangePage);
  searchInput.addEventListener('input', delay((e) => searchMovies(e), 1000));
  modalContainer.addEventListener('click', onCloseModal);

  async function init() {
    try {
      loader.toggleLoader(true);
      await moviesData.getMoviesIDsPerPage();
      renderContent(moviesData);
    } catch (error) {
      notifyView.renderNotify(error);
      return Promise.reject(error);
    } finally {
      loader.toggleLoader(false);
    }
  }

  function renderContent(data) {
    moviesList.setTitle(data);
    moviesList.createMoviesList(data);
    pagination.initPagination(data);
  }

  function delay(callback, ms = 0) {
    let timer = 0;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(callback.bind(this, ...args), ms);
    };
  }

  function checkMovieModalData(element) {
    const id = element.dataset.id || null;
    if (!id) return;
    return moviesData.movie(id);
  }

  async function searchMovies({ target }) {
    try {
      const query = target.value;
      loader.toggleLoader(true);
      const search = await moviesData.searchMovies(query);
      if (!search) {
        init();
        return;
      }
      renderContent(moviesData);
    } catch (error) {
      notifyView.renderNotify(error);
      return Promise.reject(error);
    } finally {
      loader.toggleLoader(false);
    }
  }

  async function onChangePage({ target }) {
    if (target.dataset.page) {
      moviesData.currentPage = +target.dataset.page;
      init();
    }
  }

  function onChangeBg({ target }) {
    if (target.classList.contains('movie-poster')) {
      posterBg.changePoster(target.style.backgroundImage);
    }
  }

  function onShowModal({ target }) {
    const movieCard = target.closest('div[data-id]');
    if (movieCard) {
      const movie = checkMovieModalData(movieCard);
      modal.showModal(movie);
    }
  }

  function onCloseModal({ target }) {
    const button = target.closest('.close');
    if (button) {
      modal.closeModal();
    }
  }
});
