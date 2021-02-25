export class MoviesList {
  constructor() {
    this.titleContainer = document.querySelector('.movies-container .title');
    this.container = document.querySelector('.movies-container .row');
  }

  setTitle({ isSearch, query }) {
    const title = isSearch ? `Search: ${query}` : 'IMDB Top 250';
    this.titleContainer.textContent = title;
  }

  async createMoviesList({ movies }) {
    const fragment = Object.values(movies)
      .reduce((acc, movie) => acc + MoviesList.movieItemTemplate(movie), '');
    this.container.innerHTML = '';
    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  static movieItemTemplate({
    imdbID, Poster, Title, Year,
  }) {
    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" data-toggle="modal" data-target="#movieModal" data-id="${imdbID}">
        <div class="mb-3 sc-jzJRlG gVuklN">
          <div class="sc-VigVT htVHHo">
            ${MoviesList.noPosterTemplate(Poster)}
          </div>
          <div class="sc-cSHVUG etTiMm">
            <div>
              <h3>${Title}</h3>
              <div class="lead">${Year}</div>
            </div>
          </div>
        </div>
      </div>`;
  }

  static noPosterTemplate(Poster) {
    const noPoster = `
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="film" class="svg-inline--fa fa-film fa-w-16 fa-4x " 
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 
      0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12
      12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 
      0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 
      12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 
      208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 
      0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12
      12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 
      12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"></path>
    </svg>`;
    const poster = Poster !== 'N/A' ? `style="background:url(${Poster});"` : '';

    return `
    <div class="sc-jTzLTM eKtFoc movie-poster kGRTUe" ${poster} > ${poster ? '' : noPoster}</div>
    `;
  }
}

const moviesList = new MoviesList();
export default moviesList;
