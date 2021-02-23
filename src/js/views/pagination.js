class Pagination {
  constructor() {
    this.paginationContainer = document.querySelector('.pagination');
    this.maxNumberOfButtons = 5;
    this.minPage = 1;
    this.maxPage = 1;
    console.log(this.maxPage);
  }

  initPagination({ minPage, maxPage, currentPage }) {
    this.paginationContainer.innerHTML = '';
    const fragment = Pagination.paginationTemplate({ minPage, maxPage, currentPage });
    this.paginationContainer.insertAdjacentHTML('afterbegin', fragment);
  }

  static paginationTemplate({ minPage, maxPage, currentPage }) {
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

const pagination = new Pagination();
export default pagination;
