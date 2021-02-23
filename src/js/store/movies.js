import apiService from '../services/apiService';
import moviesList from '../views/moviesList';

class Movies {
  constructor(api) {
    this.url = new URL(window.location.href);
    this.api = api;
    this.moviesPerPage = 12;
    this.currentPage = 1;
    this.query = null;
    this.isSearch = false;
    this.moviesData = {};
  }

  set isSearchValue(value) {
    this.isSearch = value;
    moviesList.setTitle();
  }

  get isSearchValue() {
    return this.isSearch;
  }

  async getMoviesIDsPerPage() {
    this.isSearchValue = false;
    const range = {
      from: this.currentPage * this.moviesPerPage - this.moviesPerPage,
      to: this.currentPage * this.moviesPerPage,
    };
    const newMovies = await this.api.fetchMovies(range);
    this.movies = Movies.createMoviesObject(newMovies);
  }

  set movies(value) {
    this.moviesData = value;
    moviesList.createMoviesList();
  }

  get movies() {
    return this.moviesData;
  }

  set newCurrentPage(page) {
    if (this.currentPage !== page && typeof page === 'number') {
      this.currentPage = page;
      this.movies = this.getMoviesIDsPerPage();
      console.log(this.movies);
    }
  }

  async searchMovies(query) {
    if (!query) {
      this.isSearchValue = false;
      this.getMoviesIDsPerPage();
      return;
    }
    const searchMovies = await this.api.fetchSearchMovies(query);
    if (!searchMovies) {
      this.isSearchValue = false;
      return;
    }
    this.query = query;
    this.isSearchValue = true;
    this.movies = Movies.createMoviesObject(searchMovies);
    console.log(this.movies);
  }

  set param(page) {
    this.url.searchParams.set('page', page);
  }

  get param() {
    return this.url.searchParams.get('page');
  }

  get maxPage() {
    return Math.ceil(this.api.numberOfIDs / this.moviesPerPage) || 1;
  }

  getMovie(imdbID) {
    console.log(this.movies);
    if (imdbID /* && this.movies.hasOwnProperty(imdbID) */) {
      return this.movies[imdbID];
    }
    return {};
  }

  static createMoviesObject(movies) {
    return movies.reduce((acc, movie) => {
      acc[movie.imdbID] = movie;
      return acc;
    }, {});
  }
}

const movies = new Movies(apiService);

export default movies;
