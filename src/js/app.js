import '../css/style.css';
import moviesList from './views/moviesList';
import posterBg from './views/posterBg';
import modal from './views/modal';
import pagination from './views/pagination';
import moviesData from './store/movies';

document.addEventListener('DOMContentLoaded', () => {
  init();

  // Elements
  const movieContainer = document.querySelector('.movies-container .row');
  const paginationContainer = document.querySelector('.pagination');
  const searchInput = document.querySelector('nav .search');
  console.log(paginationContainer);
  // Events
  movieContainer.addEventListener('mouseover', onChangeBg);
  movieContainer.addEventListener('click', onShowModal);
  paginationContainer.addEventListener('click', onChangePage);
  searchInput.addEventListener('input', delay((e) => searchMovies(e), 1000));
  // closeModal.addEventListener('click', modal.close);

  async function init() {
    await moviesData.getMoviesIDsPerPage();
    moviesList.setTitle(moviesData);
    moviesList.createMoviesList(moviesData);
    pagination.initPagination(moviesData);
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
    const query = target.value;
    console.log(query);
    await moviesData.searchMovies(query);
    moviesList.createMoviesList(moviesData);
  }

  async function onChangePage({ target }) {
    if (target.dataset.page) {
      console.log(target.dataset.page);
      moviesData.newCurrentPage = +target.dataset.page;
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
});
