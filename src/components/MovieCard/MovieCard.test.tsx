import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/* Types */
import { MovieInfo } from '../../types';

/* Components */
import { MovieCard } from './MovieCard';


describe('MovieCard component', () => {
  it('should render the movie card with link to /movie/:id', () => {
    let movie = require('../../test/movie_info-569094.json') as MovieInfo;
    render(
      <BrowserRouter>
        <MovieCard movie={movie} />
      </BrowserRouter>
    );

    const mCard = screen.getByRole('movieCard');
    expect(mCard).toBeInTheDocument();
    expect(mCard.getAttribute('href')).toBe(`/movie/${movie.id}`);
  });

  it('should render a movie card with photo, title + description and release date', () => {
    let movie = require('../../test/movie_info-569094.json') as MovieInfo;
    render(
      <BrowserRouter>
        <MovieCard movie={movie} />
      </BrowserRouter>
    );

    const mCard = screen.getByRole('movieCard');
    expect(mCard).toBeInTheDocument();

    const img = mCard.getElementsByTagName('img')[0];
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe(`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`);

    expect(mCard).toHaveTextContent(movie.title);
    expect(mCard).toHaveTextContent(movie.overview);
    expect(mCard).toHaveTextContent(movie.release_date);
  });

  it('should not render a movie card', () => {
    let movie = require('../../test/movie_info-error.json') as MovieInfo;
    render(
      <BrowserRouter>
        <MovieCard movie={movie} />
      </BrowserRouter>
    );

    expect(screen.queryByRole('movieCard')).not.toBeInTheDocument();
  });
});