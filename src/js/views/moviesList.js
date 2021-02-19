import moviesData from '../store/movies';

class MoviesList {
  constructor(movies) {
    this.container = document.querySelector('.movies-container .row');
    this.movies = movies;
  }

  async createMoviesList() {
    const moviesList = await this.movies.getMoviesPerPage();
    const fragment = Object.values(moviesList).reduce((acc, movie) => acc + MoviesList.movieItemTemplate(movie), '');
    console.log(this.container);
    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  static movieItemTemplate({
    imdbID, Poster, Title, Year,
  }) {
    console.log(imdbID, Poster, Title, Year);
    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3" data-id="${imdbID}">
      <div class="mb-3 sc-jzJRlG gVuklN">
        <div class="sc-VigVT htVHHo">
          <div class="sc-jTzLTM eKtFoc movie-poster" style="background:url(${Poster});"></div>
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
}

const moviesList = new MoviesList(moviesData);
export default moviesList;
