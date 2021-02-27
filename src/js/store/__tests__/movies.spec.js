import moviesInstance, { Movies } from '../movies';
import api, { Api } from '../../services/apiService';
import top250imdb from '../mock/imdb_top250.json';
import { mockSearchMoviesData, mockMoviesData, mockMoviesArray } from '../mock/test_movies_data';

jest.mock('../../services/apiService', () => {
  const mockApi = {
    fetchSearchMovies: jest.fn((query) => {
      /* if(mockSearchMoviesData.Title.toLowerCase().includes(query)){
        return Promise.resolve( [mockSearchMoviesData]);
      }
      return Promise.reject({Error: 'true'}); */
      Promise.resolve( [mockSearchMoviesData]);
      
    }),
    fetchMovies: jest.fn(() => {
      Promise.resolve(mockMoviesArray);
    }),
    numberOfIDs: /* Object.values(mockMoviesData).length */ 12,
  }

  return {
    Api: jest.fn(() => mockApi)
  }
});

const apiService = new Api;

describe('Movies store tests', () => {
  it('Check that moviesInstance is instance of Movies class', () => {
    expect(moviesInstance).toBeInstanceOf(Movies);
  });
  it('Success Movies instance create', () => {
    const instance = new Movies(apiService, top250imdb);
    const maxPage = Math.ceil(top250imdb.length / instance.moviesPerPage);

    expect(instance.url).toBeInstanceOf(URL);
    expect(instance.url.href).toBe(window.location.href);
    expect(instance.IDs).toBe(top250imdb);
    expect(instance.api).toEqual(apiService);
    expect(instance.minPage).toBe(1);
    expect(instance.moviesPerPage).toBe(12);
    expect(instance.maxPage).toBe(maxPage);
    expect(instance.query).toBe(null);
    expect(instance._isSearch).toBe(false);
    expect(instance._moviesData).toEqual({});

    expect(instance._currentPage).toBe(instance.currentPage);
    expect(instance._moviesData).toEqual(instance.moviesData);
    expect(instance._isSearch).toEqual(instance.isSearch);
  });

  it('Check correct movies serialize', () =>{
    const resultSerialize = Movies.serializeMovies(Object.values(mockMoviesData));
    expect(resultSerialize).toEqual(mockMoviesData);
  });

  it('Check countries serialize with incorrect data', () => {
    const resultSerialize = Movies.serializeMovies(null);
    expect(resultSerialize).toEqual({}); 
  });
/*
  it('Check correct movies fetch', () => {
    const instance = new Movies(apiService);
    const result = instance.getMoviesIDsPerPage()
    console.log(result);
    expect(result).resolves.toEqual(mockMoviesData);
  });*/
  
});
