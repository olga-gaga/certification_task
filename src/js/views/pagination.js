import moviesStore from '../store/movies';
import moviesListView from './moviesList';

class Pagination {
  constructor(moviesData, moviesList) {
    this.paginationContainer = document.querySelector('.pagination');
    this.moviesData = moviesData;
    this.moviesList = moviesList;
    this.maxNumberOfButtons = 5;
    this.minPage = 1;
    this.maxPage = this.moviesData.maxPage;
    console.log(this.maxPage);
  }

  initPagination() {
    this.paginationContainer.innerHTML = '';
    const fragment = Pagination.paginationTemplate(this.minPage, this.maxPage, this.moviesData.currentPage);
    this.paginationContainer.insertAdjacentHTML('afterbegin', fragment);
  }

  changePage(page) {
    if (this.moviesData.currentPage === page) return;
    this.moviesData.newCurrentPage = page;
    this.moviesList.createMoviesList();
    this.initPagination();
  }

  static paginationTemplate(minPage, maxPage, currentPage) {
    const disabled = 'hidden';
    return `
      <button type="button" data-page="${minPage}" class="btn btn-outline-light ${currentPage === minPage ? disabled : ''}">«</button>
      <button type="button" data-page="${currentPage - 1}" class="btn btn-outline-light ${currentPage === minPage ? disabled : ''}">Previous</button>
      ${Pagination.buttonsTemplate(maxPage, currentPage)}
      <button type="button" data-page="${currentPage + 1}" class="btn btn-outline-light ${currentPage === maxPage ? disabled : ''}" >Next</button>
      <button type="button" data-page="${maxPage}" class="btn btn-outline-light ${currentPage === maxPage ? disabled : ''}">»</button>`;
  }

  static buttonsTemplate(maxPage, currentPage) {
    const shift = 4;
    let startPage = 1;
    let fragment = '';
    if (currentPage < shift) startPage = 1;
    else if (currentPage <= maxPage - shift) startPage = currentPage - 2;
    else startPage = maxPage - shift;

    for (let i = 0; i <= shift; i++) {
      const page = startPage + i;
      fragment += `<button type="button" data-page="${page}" class="btn ${page === currentPage ? 'btn-light' : 'btn-outline-light'}">${page}</button>`;
    }
    console.log(fragment);
    return fragment;
  }
}

const pagination = new Pagination(moviesStore, moviesListView);
export default pagination;
