import apiService from '../services/apiService';

class Movies {
  constructor(api) {
    this.url = new URL(window.location.href);
    this.api = api;
    this.minPage = 1;
    this.moviesPerPage = 12;
    this.maxPage = Math.ceil(this.api.numberOfIDs / this.moviesPerPage) || 1;
    this.currentPage = this.minPage;
    this.newCurrentPage = this.param;
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
    const numberPage = parseInt(page, 10);
    if (page < this.minPage || !numberPage) {
      this.currentPage = this.minPage;
    } else if (page > this.maxPage) {
      this.currentPage = this.maxPage;
    } else {
      this.currentPage = numberPage;
    }
    this.param = this.currentPage || 1;
  }

  async searchMovies(query) {
    if (!query) {
      this.isSearchValue = false;
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
    return this.isSearchValue;
  }

  set param(page) {
    const urlPage = Number(this.url.searchParams.get('page'));
    if (urlPage === page || !page) return;
    this.url.searchParams.set('page', page);
    window.location.href = this.url;
  }

  get param() {
    return this.url.searchParams.get('page') || 1;
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
