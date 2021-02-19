import axios from 'axios';
import interceptors from './interceptors';

const instance = axios.create({
  baseURL: 'http://www.omdbapi.com',
  params: {
    apikey: '10015c8b',
    plot: 'full',
  },
});
interceptors(instance);
export default instance;
