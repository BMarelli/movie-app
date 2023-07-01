import React from 'react'
import { Link } from 'react-router-dom';

/* Types */
import { MovieInfo } from '../../types';

interface MovieCardProps {
  movie: MovieInfo;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  if (Object.keys(movie).length === 0) return (<></>);

  return (
    <Link to={`/movie/${movie.id}`} role='movieCard' className="my-2 mx-1 max-w-sm rounded overflow-hidden shadow-lg hover:bg-slate-100">
      <img className="w-full" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
      <div className='flex flex-col justify-between'>
        <div className="grow px-6 py-4">
          <div className="font-bold text-lg mb-2">{movie.title}</div>
          <p className="text-gray-700 text-base">
            {/* {''.concat(movie.overview.split(' ').slice(0, 15).join(' '), '  ... more ')} */}
            {movie.overview}
          </p>
        </div>
        <div className="flex-none mt-auto px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">release date: {movie.release_date}</span>
        </div>
      </div>
    </Link>
  );
}