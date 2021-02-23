import apiService from '../services/apiService';

class Movies {
  constructor(api) {
    this.url = new URL(window.location.href);
    this.api = api;
    this.moviesPerPage = 12;
    console.log('page', this.url.searchParams.get('page'));
    this.currentPage = Number(this.url.searchParams.get('page')) || 1;
    this.minPage = 1;
    this.maxPage = Math.ceil(this.api.numberOfIDs / this.moviesPerPage) || 1;
    this.query = null;
    this.isSearch = false;
    this.moviesData = {};
  }

  set isSearchValue(value) {
    const newValue = Boolean(value);
    this.isSearch = newValue;
    if (!newValue) {
      this.getMoviesIDsPerPage();
    }
  }

  get isSearchValue() {
    return this.isSearch;
  }

  async getMoviesIDsPerPage() {
    const range = {
      from: this.currentPage * this.moviesPerPage - this.moviesPerPage,
      to: this.currentPage * this.moviesPerPage,
    };
    const newMovies = await this.api.fetchMovies(range);
    this.movies = Movies.createMoviesObject(newMovies);
  }

  set movies(value) {
    this.moviesData = value;
  }

  get movies() {
    return this.moviesData;
  }

  set newCurrentPage(page) {
    if (this.currentPage !== page && typeof page === 'number') {
      this.url.searchParams.set('page', page);
      window.location.href = this.url;
      this.currentPage = page;
    }
  }

  async searchMovies(query) {
    if (!query) {
      this.isSearchValue = false;
      return;
    }
    const searchMovies = await this.api.fetchSearchMovies(query);
    console.log(searchMovies);
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

  get movie() {
    return (imdbID) => {
      if (imdbID /* && this.movies.hasOwnProperty(imdbID) */) {
        return this.movies[imdbID];
      }
      return {};
    };
  }

  static createMoviesObject(movies) {
    return movies.reduce((acc, movie) => {
      const newMovie = Movies.checkMovieData(movie);
      acc[movie.imdbID] = newMovie;
      return acc;
    }, {});
  }

  static checkMovieData(movie) {
    const newMovie = { ...movie };
    Object.entries(newMovie).forEach(([key, value]) => {
      if (!value) {
        newMovie[key] = 'N/A';
      }
    });
    return newMovie;
  }
}

const movies = new Movies(apiService);

export default movies;
