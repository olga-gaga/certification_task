import apiService from '../services/apiService';
import top250imdb from './mock/imdb_top250.json';

export class Movies {
  constructor(api, IDs) {
    this.url = new URL(window.location.href);
    this.IDs = IDs;
    this.api = api;
    this.minPage = 1;
    this.moviesPerPage = 12;
    this.maxPage = Math.ceil(this.IDs.length / this.moviesPerPage) || 1;
    this.currentPage = this.param || 1;
    this.query = null;
    this._isSearch = false;
    this._moviesData = {};
  }

  set isSearch(value) {
    const newValue = Boolean(value);
    this._isSearch = newValue;
    if (!newValue) {
      this.getMoviesIDsPerPage();
    }
  }

  set param(page) {
    const urlPage = Number(this.url.searchParams.get('page')) || 1;
    if (urlPage === page || !page) {
      return;
    }
    this.url.searchParams.set('page', page);
    history.pushState(null, null, this.url);
  }

  set moviesData(value) {
    if (!Array.isArray(value)) {
      this._moviesData = {};
      return;
    }
    this._moviesData = Movies.serializeMovies(value);
  }

  set currentPage(page) {
    if (!page) {
      return;
    }
    this._currentPage = this.checkPage(page);
    this.param = this._currentPage || 1;
  }

  get moviesData() {
    return this._moviesData || {};
  }

  get currentPage() {
    return this._currentPage || this.minPage;
  }

  get param() {
    return this.url.searchParams.get('page') || 1;
  }

  get movie() {
    return (imdbID) => {
      if (imdbID) {
        return this._moviesData[imdbID] || {};
      }
      return {};
    };
  }

  get isSearch() {
    return this._isSearch || false;
  }

  async getMoviesIDsPerPage() {
    const slicedIDs = Movies.getRangeIDs(this);
    const newMovies = await this.api.fetchMovies(slicedIDs);
    if (!newMovies) {
      return {};
    }
    this.moviesData = newMovies || [];
    return this.moviesData;
  }

  async searchMovies(query) {
    if (!query) {
      this.isSearch = false;
      return this.isSearch;
    }
    const searchIDs = await this.api.getSearchIDs(query);
    if (!searchIDs) {
      this.isSearch = false;
      return this.isSearch;
    }
    const searchMovies = await this.api.fetchMovies(searchIDs);
    if (!searchMovies) {
      this.isSearch = false;
      return this.isSearch;
    }
    this.query = query;
    this.isSearch = true;
    this.moviesData = searchMovies || [];
    return this.moviesData;
  }

  checkPage(page) {
    const numberPage = parseInt(page, 10);
    if (page < this.minPage || !numberPage) {
      return this.minPage;
    }
    if (page > this.maxPage) {
      return this.maxPage;
    }
    return numberPage;
  }

  static serializeMovies(movies) {
    if (!Array.isArray(movies)) {
      return {};
    }
    return movies.reduce((acc, movie) => {
      const newMovie = Movies.checkMovieData(movie);
      acc[movie.imdbID] = newMovie;
      return acc;
    }, {});
  }

  static checkMovieData(movie) {
    if (!movie || typeof movie !== 'object') {
      return {};
    }
    const newMovie = { ...movie };
    Object.entries(newMovie).forEach(([key, value]) => {
      if (!value) {
        newMovie[key] = 'N/A';
      }
    });
    return newMovie;
  }

  static getRangeIDs({ currentPage, moviesPerPage, IDs }) {
    const from = currentPage * moviesPerPage - moviesPerPage;
    const to = currentPage * moviesPerPage;
    if (!IDs.length || Number.isNaN(from) || Number.isNaN(to)) {
      return [];
    }
    return IDs.slice(from, to);
  }
}

const movies = new Movies(apiService, top250imdb);

export default movies;
