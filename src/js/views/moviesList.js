import movies from '../store/movies';

class MoviesList {
  constructor(moviesData) {
    this.titleContainer = document.querySelector('.movies-container .title');
    console.log(this.titleContainer);
    this.container = document.querySelector('.movies-container .row');
    this.moviesData = moviesData;
  }

  setTitle() {
    const title = this.moviesData.isSearch ? `Search: ${this.moviesData.query}` : 'IMDB Top 250';
    console.log(`title ${this.moviesData.isSearch} ${title}`);
    this.titleContainer.textContent = title;
  }

  async createMoviesList() {
    console.log(this.moviesData);
    const fragment = Object.values(this.moviesData.movies)
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

const moviesList = new MoviesList(movies);
export default moviesList;
