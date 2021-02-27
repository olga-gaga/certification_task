import apiService, { ApiService } from '../apiService';
import axios from '../../plugins/axios';
import { mockSearchMoviesData, mockMoviesArray, mockTop250IDs, mockError } from '../../store/mock/test_movies_data';

jest.mock('../../plugins/axios/index.js');

describe('Test success fetch movies', () => {
  it('Success fetch movies data', async () => {
    const expectedData = mockMoviesArray[0]; 
    axios.get.mockImplementationOnce(() => Promise.resolve(expectedData));
    await expect(apiService.fetchMovies(mockTop250IDs)).resolves.toEqual([expectedData]);
    expect(axios.get).toHaveBeenCalledWith(`/?i=${expectedData.imdbID}`);
  });

  it('Success fetch search movies IDs', async () => {
    const query = 'spider';
    axios.get.mockImplementationOnce(() => Promise.resolve({ Search: [mockMoviesArray[0]] }));
    await expect(apiService.getSearchIDs(query)).resolves.toEqual([mockMoviesArray[0].imdbID]);
    expect(axios.get).toHaveBeenCalledWith(`/?s=${query}`);
  });  
});

describe('Test fetch movies failure', () => {
  it('Fetch movies failure', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(mockError));
    await expect(apiService.fetchMovies(mockTop250IDs)).rejects.toEqual(mockError);
  });

  it('Check fetch movies with incorrect data', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(mockError));
    await expect(apiService.fetchMovies(NaN)).rejects.toEqual(Error(true));
  });
  
    it('Fetch search movies IDs failure', async () => {
      axios.get.mockImplementationOnce(() => Promise.reject(mockError));
      await expect(apiService.getSearchIDs('test')).rejects.toEqual(mockError);
    });
  
    it('Check fetch search movies IDs with incorrect data', async () => {
      axios.get.mockImplementationOnce(() => Promise.reject(mockError));
      await expect(apiService.getSearchIDs(NaN)).rejects.toEqual(Error(true));
    });
});

