import moviesInstance, { Movies } from '../movies';
import { ApiService as Api } from '../../services/apiService';
import top250imdb from '../mock/imdb_top250.json';
import { mockTop250IDs, mockMoviesData, mockMoviesArray } from '../mock/test_movies_data';

jest.mock('../../services/apiService', () => {
  const mockApi = {
    fetchMovies: jest.fn(() => Promise.resolve(mockMoviesArray)),
    getSearchIDs: jest.fn(() => Promise.resolve(mockTop250IDs)),
  };

  return {
    ApiService: jest.fn(() => mockApi),
  };
});

const apiService = new Api();

describe('Testing instantiation', () => {
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
  });

  it('Success get value', () => {
    const instance = new Movies(apiService, top250imdb);
    instance.currentPage = 5;
    instance.moviesData = mockMoviesArray;
    expect(instance.isSearch).toBe(instance._isSearch);
    expect(instance.currentPage).toBe(instance._currentPage);
    expect(instance.param).toBe(instance.url.searchParams.get('page'));
    expect(instance.movie(NaN)).toEqual({});
    expect(instance.movie('tt0050083')).toEqual(mockMoviesData.tt0050083);
    expect(instance.moviesData).toEqual(instance._moviesData);
  });

  it('Success set isSearch value', () => {
    const instance = new Movies(apiService, top250imdb);
    instance.isSearch = true;
    expect(instance._isSearch).toBe(true);
    instance.isSearch = false;
    expect(instance._isSearch).toBe(false);
    instance.isSearch = 1;
    expect(instance._isSearch).toBe(true);
    instance.isSearch = NaN;
    expect(instance._isSearch).toBe(false);
    instance.isSearch = 'test';
    expect(instance._isSearch).toBe(true);
    instance.isSearch = '';
    expect(instance._isSearch).toBe(false);
  });

  it('Success set param value', () => {
    const instance = new Movies(apiService, top250imdb);
    const currentUrl = instance.url;
    instance.param = '';
    expect(instance.url).toBe(currentUrl);
    instance.param = 2;
    expect(instance.url.searchParams.get('page')).toBe('2');
  });

  it('Success set currentPage value', () => {
    const instance = new Movies(apiService, top250imdb);

    instance.currentPage = 1;
    expect(instance._currentPage).toBe(1);
    expect(instance.url.searchParams.get('page')).toBe('1');

    instance.currentPage = instance.maxPage;
    expect(instance._currentPage).toBe(instance.maxPage);
    expect(instance.url.searchParams.get('page')).toBe(`${instance.maxPage}`);

    instance.currentPage = -1;
    expect(instance._currentPage).toBe(1);
    expect(instance.url.searchParams.get('page')).toBe('1');

    instance.currentPage = instance.maxPage + 100;
    expect(instance._currentPage).toBe(instance.maxPage);
    expect(instance.url.searchParams.get('page')).toBe(`${instance.maxPage}`);

    instance.currentPage = '1';
    expect(instance._currentPage).toBe(1);
    expect(instance.url.searchParams.get('page')).toBe('1');

    instance.currentPage = NaN;
    expect(instance._currentPage).toBe(1);
    expect(instance.url.searchParams.get('page')).toBe('1');
  });

  it('Success set moviesData value', () => {
    const instance = new Movies(apiService, top250imdb);
    instance.moviesData = '';
    expect(instance._moviesData).toEqual({});
    instance.moviesData = [];
    expect(instance._moviesData).toEqual({});
    instance.moviesData = mockMoviesArray;
    expect(instance._moviesData).toEqual(mockMoviesData);
  });
});

describe('Movies store tests', () => {
  it('Check correct movies serialize', () => {
    const resultSerialize = Movies.serializeMovies(mockMoviesArray);
    expect(resultSerialize).toEqual(mockMoviesData);
  });

  it('Check movies serialize with incorrect data', () => {
    const resultSerialize = Movies.serializeMovies(null);
    expect(resultSerialize).toEqual({});
  });

  it('Correct function check page', () => {
    expect(moviesInstance.checkPage('1')).toBe(1);
    expect(moviesInstance.checkPage('5')).toBe(5);
    expect(moviesInstance.checkPage('21')).toBe(21);
    expect(moviesInstance.checkPage('test')).toBe(moviesInstance.minPage);
    expect(moviesInstance.checkPage(NaN)).toBe(1);
    expect(moviesInstance.checkPage('-1')).toBe(moviesInstance.minPage);
    expect(moviesInstance.checkPage('100')).toBe(moviesInstance.maxPage);
  });
  it('Correct function check movie data', () => {
    const expectedData = {
      Poster: 'N/A',
      Title: 'N/A',
    };
    expect(Movies.checkMovieData({ Poster: '', Title: '' })).toEqual(expectedData);
    expect(Movies.checkMovieData(mockMoviesArray[0])).toEqual(mockMoviesArray[0]);
  });
  it('Correct function get range IDs', () => {
    const testMin = {
      attr: { currentPage: moviesInstance.minPage, moviesPerPage: moviesInstance.moviesPerPage, IDs: top250imdb },
      from: moviesInstance.minPage * moviesInstance.moviesPerPage - moviesInstance.moviesPerPage,
      to: moviesInstance.minPage * moviesInstance.moviesPerPage,
    };
    const testMax = {
      attr: { currentPage: moviesInstance.maxPage, moviesPerPage: moviesInstance.moviesPerPage, IDs: top250imdb },
      from: moviesInstance.maxPage * moviesInstance.moviesPerPage - moviesInstance.moviesPerPage,
      to: moviesInstance.maxPage * moviesInstance.moviesPerPage,
    };
    const testNaN = { currentPage: 'false', moviesPerPage: undefined, IDs: top250imdb };

    expect(Movies.getRangeIDs(testMin.attr)).toEqual(top250imdb.slice(testMin.from, testMin.to));
    expect(Movies.getRangeIDs(testMax.attr)).toEqual(top250imdb.slice(testMax.from, testMax.to));
    expect(Movies.getRangeIDs(testNaN)).toEqual([]);
  });

  it('Check correct movies fetch', async () => {
    const instance = new Movies(apiService, top250imdb);
    await expect(instance.getMoviesIDsPerPage()).resolves.toEqual(mockMoviesData);
  });

  it('Check correct search movies fetch', async () => {
    const instance = new Movies(apiService, top250imdb);
    await expect(instance.searchMovies('spider')).resolves.toEqual(mockMoviesData);
  });

  it('Check search movies fetch with incorrect data', async () => {
    const instance = new Movies(apiService, top250imdb);
    await expect(instance.searchMovies('')).resolves.toBe(false);
  });
});
