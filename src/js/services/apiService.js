import axios from '../plugins/axios';
import top250imdb from './mock/imdb_top250.json';
import notifyView from '../views/notification';
import loader from '../views/loader';

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
      loader.toggleLoader(true);
      this.isSearch = true;
      const response = await axios.get(`/?s=${query}`);
      if (response.Error) {
        throw Error(response.Error);
      }
      this.searchIDs = response.Search.map(({ imdbID }) => imdbID);
      const result = await ApiService.getMoviesData(this.searchIDs);
      return result;
    } catch (error) {
      notifyView.renderNotify(error);
      return Promise.reject(error);
    } finally {
      loader.toggleLoader(false);
    }
  }

  async fetchMovies({ from, to }) {
    try {
      loader.toggleLoader(true);
      const slicedIDs = this.IDs.slice(from, to);
      return await ApiService.getMoviesData(slicedIDs);
    } catch (error) {
      notifyView.renderNotify(error);
      return Promise.reject(error);
    } finally {
      loader.toggleLoader(false);
    }
  }

  static async getMoviesData(slicedIDs) {
    const requests = slicedIDs.map((id) => axios.get(`/?i=${id}`));
    const result = await Promise.all(requests)
      .then((value) => value)
      .catch((error) => notifyView.renderNotify(error));
    return result || [];
  }
}

const api = new ApiService(top250imdb);
export default api;
