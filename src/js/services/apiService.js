import axios from '../plugins/axios';

export class ApiService {
  async fetchMovies(IDs) {
    try {
      if (!Array.isArray(IDs)) {
        throw Error(true)
      }
      const requests = IDs.map((id) => axios.get(`/?i=${id}`));
      const result = await Promise.all(requests);
      if (result.Error){
        throw Error(result.Error);
      }
      return result || [];
    } catch (error) {
      return Promise.reject(error);
    } 
  }

  async getSearchIDs(query) {
    try {

      if (!query) {
        throw Error(true);
      }
      const response = await axios.get(`/?s=${query}`);
      if(response.Error || !Array.isArray(response.Search)) {
        throw Error(response.Error);
      }
      const searchIDs = response.Search.map(({ imdbID }) => imdbID);
      return searchIDs || [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

const api = new ApiService();
export default api;
