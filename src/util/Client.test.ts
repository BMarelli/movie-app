import Client from './Client';


describe('Client', () => {
  it('should get the first page of movies', async () => {
    const client = new Client('https://api.themoviedb.org/3');
    const movies = await require('../test/movies-trending-1.json');
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify(movies))));

    const response = await client.getMovies();
    expect(response).toEqual(movies.results);
  });

  it('should get the movie information with id 569094', async () => {
    const client = new Client('https://api.themoviedb.org/3');
    const movie = await require('../test/movie_info-569094.json');
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify(movie))));

    const response = await client.getMovie(569094);
    expect(response).toEqual(movie);
  });

  it('should throw an error when the response is not ok', async () => {
    const client = new Client('https://api.themoviedb.org/3');
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('error')));

    const response = client.getMovies();
    expect(response).rejects.toThrow('error');
  });
});