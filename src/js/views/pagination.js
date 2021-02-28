class Pagination {
  constructor() {
    this.paginationContainer = document.querySelector('.pagination');
    this.maxNumberOfButtons = 5;
    this.minPage = 1;
    this.maxPage = 1;
  }

  initPagination({
    minPage, maxPage, currentPage, isSearch,
  } = {}) {
    this.paginationContainer.innerHTML = '';
    if (isSearch) return;
    const fragment = Pagination.paginationTemplate({ minPage, maxPage, currentPage });
    this.paginationContainer.insertAdjacentHTML('afterbegin', fragment);
  }

  static paginationTemplate({ minPage, maxPage, currentPage } = {}) {
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
    const startPage = Pagination.getStartPage({ currentPage, maxPage, shift });
    const fragment = [...Array(shift + 1).keys()].reduce((acc, i) => {
      const page = startPage + i;
      const btnClass = (page === currentPage) ? 'btn-light' : 'btn-outline-light';
      return `${acc} <button type="button" data-page="${page}" class="btn ${btnClass}"> ${page} </button>`;
    }, '');
    return fragment;
  }

  static getStartPage({ currentPage = 1, maxPage = 1, shift = 1 } = {}) {
    if (currentPage < shift) {
      return 1;
    }
    if (currentPage <= maxPage - shift) {
      return currentPage - 2;
    }
    return maxPage - shift;
  }
}

const pagination = new Pagination();
export default pagination;
