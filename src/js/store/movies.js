import apiService from '../services/apiService';

class Movies {
  constructor(api) {
    this.api = api;
    this.moviesPerPage = 12;
    this.currentPage = 1;
    this.movies = {};
  }

  async getMoviesPerPage() {
    const range = {
      from: this.currentPage * this.moviesPerPage - this.moviesPerPage,
      to: this.currentPage * this.moviesPerPage,
    };
    const newMovies = await this.api.fetchMovies(range);
    console.log(newMovies);
    this.movies = newMovies.reduce((acc, movie) => {
      acc[movie.imdbID] = movie;
      return acc;
    }, {});
    return this.movies;
  }
}

const movies = new Movies(apiService);

export default movies;
