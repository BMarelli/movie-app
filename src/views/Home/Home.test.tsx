import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import Client, { ApiResponse, FetchError } from '../../util/Client';

/* Types */
import { MovieInfo } from '../../types';

/* Components */
import { Home } from './Home';


afterEach(() => {
  jest.clearAllMocks();
});

describe('Home view', () => {
  it('should render 20 MovieCards', async () => {
    const client = new Client("https://api.themoviedb.org/3");
    const response = require('../../test/movies-trending-1.json') as ApiResponse<MovieInfo[]>;
    jest.spyOn(client, 'getMovies').mockImplementation(() => Promise.resolve(response.results));

    render(
      <BrowserRouter>
        <Home client={client} />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      const movies = screen.getAllByRole('movieCard');
      expect(movies.length).toBe(20);
    });
  });

  it('should render 20 new MoviesCard on click "->" button', async () => {
    const client = new Client("https://api.themoviedb.org/3");
    const response = require('../../test/movie-trending-multiple.json') as ApiResponse<MovieInfo[]>[];
    jest.spyOn(client, 'getMovies').mockImplementation(() => Promise.resolve(response[0].results));

    render(
      <BrowserRouter>
        <Home client={client} />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(async () => {
      const oldMovies = screen.getAllByRole('movieCard');

      jest.spyOn(client, 'getMovies').mockImplementation(() => Promise.resolve(response[1].results));
      const button = screen.getByRole('incrementPage');
      expect(button).toBeInTheDocument();
      await act(() => {
        button.click();
      })

      const newMovies = screen.getAllByRole('movieCard');
      expect(newMovies.length).toBe(20);
      expect(newMovies).not.toEqual(oldMovies);
    });
  });

  it('should not render any MovieCard', async () => {
    const client = new Client("https://api.themoviedb.org/3");
    const response = require('../../test/movies-empty.json') as ApiResponse<MovieInfo[]>;
    jest.spyOn(client, 'getMovies').mockImplementation(() => Promise.resolve(response.results));

    render(
      <BrowserRouter>
        <Home client={client} />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      const movies = screen.queryAllByRole('movieCard');
      expect(movies.length).toBe(0);
    });
  })
});

describe('Home view with error', () => {
  it('should render error message', async () => {
    const client = new Client("https://api.themoviedb.org/3");
    jest.spyOn(client, 'getMovies').mockImplementation(() => Promise.reject(new FetchError('Testing Error')));

    render(
      <BrowserRouter>
        <Home client={client} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      const error = screen.getByText('Testing Error');
      expect(error).toBeInTheDocument();
    });
  });
});