import axios from 'axios';
import API_ENV from '../../config/apiConfig';
import interceptors from './interceptors';

const instance = axios.create({
  baseURL: API_ENV.url,
  params: {
    apikey: API_ENV.key,
    plot: 'full',
  },
});
interceptors(instance);
export default instance;
