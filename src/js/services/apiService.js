import axios from '../plugins/axios';
import top250imdb from './mock/imdb_top250.json';

class ApiService {
  constructor(IDs) {
    this.IDs = IDs;
    this.searchIDs = null;
  }

  get numberOfIDs() {
    return this.IDs.length || 0;
  }

  async fetchSearchMovies(query) {
    try {
      if (!query) return;
      this.isSearch = true;
      const response = await axios.get(`/?s=${query}`);
      if (response.Error) {
        throw Error(response.Error);
      }
      this.searchIDs = response.Search.map(({ imdbID }) => imdbID);
      // console.log(this.searchIDs);
      const result = await ApiService.getMoviesData(this.searchIDs);
      // console.log(result);
      return result;
    } catch (error) {
      console.log(Promise.reject(error));
      return Promise.reject(error);
    }
  }

  async fetchMovies({ from, to }) {
    try {
      const slicedIDs = this.IDs.slice(from, to);
      return await ApiService.getMoviesData(slicedIDs);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async getMoviesData(slicedIDs) {
    const requests = slicedIDs.map((id) => axios.get(`/?i=${id}`));
    const result = await Promise.all(requests).then((value) => value);
    return result || [];
  }
}

const api = new ApiService(top250imdb);
export default api;
