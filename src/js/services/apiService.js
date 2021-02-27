import axios from '../plugins/axios';

export class ApiService {
  constructor() {
    this.response = null;
  }

  async fetchMovies(IDs) {
    try {
      if (!Array.isArray(IDs)) {
        throw Error(true);
      }
      const requests = IDs.map((id) => axios.get(`/?i=${id}`));
      this.response = await Promise.all(requests);
      if (this.response.Error) {
        throw Error(this.response.Error);
      }
      return this.response || [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getSearchIDs(query) {
    try {
      if (!query) {
        throw Error(true);
      }
      this.response = await axios.get(`/?s=${query}`);
      if (this.response.Error || !Array.isArray(this.response.Search)) {
        throw Error(this.response.Error);
      }
      const searchIDs = this.response.Search.map(({ imdbID }) => imdbID);
      return searchIDs || [];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const api = new ApiService();
export default api;
