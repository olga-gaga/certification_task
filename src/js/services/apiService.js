import axios from '../plugins/axios';
import top250IDs from '../store/mock/imdb_top250.json';

async function getMovies(slicedIDs) {
  const requests = slicedIDs.map((id) => axios.get(`/?i=${id}`));
  const result = await Promise.all(requests).then((value) => value);
  return result;
}

class Api {
  constructor(IDs) {
    this.IDs = IDs;
  }

  async fetchMovies({ from, to }) {
    try {
      const slicedIDs = this.IDs.slice(from, to);
      return getMovies(slicedIDs);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

const apiService = new Api(top250IDs);
export default apiService;
