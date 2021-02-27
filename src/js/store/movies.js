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
    this._currentPage = this.minPage;
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

  get isSearch() {
    return this._isSearch;
  }

  async getMoviesIDsPerPage() {
    const slicedIDs = Movies.getRangeIDs(this);
    console.log(slicedIDs);
    const newMovies = await this.api.fetchMovies(slicedIDs);
    this.moviesData = Movies.serializeMovies(newMovies);
    console.dir(this.moviesData);
    return this.moviesData;
  }

  set moviesData(value) {
    if (typeof value !== 'object') {
      this._moviesData = {};
    }
    this._moviesData = value;
  }

  get moviesData() {
    return this._moviesData;
  }

  set currentPage(page) {
    this._currentPage = this.checkPage(page);
    this.param = this._currentPage || 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  async searchMovies(query) {
    if (!query) {
      this._isSearch = false;
      return;
    }
    const searchIDs = await this.api.getSearchIDs(query);
    console.log(searchIDs);
    if(!searchIDs) {
      this._isSearch = false;
      return; 
    }
    const searchMovies = await this.api.fetchMovies(searchIDs);
    console.log(searchMovies);
    if (!searchMovies) {
      this._isSearch = false;
      return;
    }
    this.query = query;
    this._isSearch = true;
    this.moviesData = Movies.serializeMovies(searchMovies);
    return this._isSearch;
  }

  set param(page) {
    const urlPage = Number(this.url.searchParams.get('page'));
    if (urlPage === page || !page) return;
    this.url.searchParams.set('page', page);
    history.pushState(null, null, this.url);
  }

  get param() {
    return this.url.searchParams.get('page') || 1;
  }

  get movie() {
    return (imdbID) => {
      if (imdbID /* && this.movies.hasOwnProperty(imdbID) */) {
        return this._moviesData[imdbID];
      }
      return {};
    };
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
    console.log(to > IDs.length - 1, to, IDs.length);
    if (!IDs.length || Number.isNaN(from) || Number.isNaN(to)) {
      return [];
    }
    return IDs.slice(from, to);
  }
}

const movies = new Movies(apiService, top250imdb);

export default movies;
