import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Client, { FetchError } from '../../util/Client';
import { Error } from '../../components';
import { MovieInterface } from '../../types';

interface MovieProps {
  client: Client;
}

export const Movie: React.FC<MovieProps> = ({ client }) => {
  const [movie, setMovie] = useState<MovieInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>('');
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (loading) {
        try {
          if (id) {
            setMovie(await client.getMovie(+id));
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
          if (e instanceof FetchError) setErrorText(e.message);
        }
      }
    }

    fetchData();
  }, [client])

  if (!id) return (<Error text="No movie Id provided" />);
  if (errorText !== '') return (<Error text={errorText} />);
  if (loading || !movie) return (<div>Loading...</div>);

  return (
    <>
      <div className='mx-auto text-justify'>
      <button className='w-full py-1 mb-4 bg-gray-200 rounded-full text-lg font-semibold text-gray-700'>
        <Link to='/'>
          <i className="fa fa-arrow-left mr-3"></i>
          <span>Back</span>
        </Link>
      </button>
        <img className="mx-auto sm:max-w-sm lg:max-w-xl" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
        <div className='mt-5'>
          <p className='text-xl mb-3 text-center font-bold'>{movie.title}</p>
          <p className='text-sm'>{movie.overview}</p>
          <br />
          <hr />
          <br />
          <div className='text-center'>
            {movie.genres.map((genre) => <span key={genre.id} className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{genre.name}</span>)}
          </div>
          <ul className='mt-6 list-disc'>
            <li><span className='text-md font-bold'>Budget: </span>${movie.budget.toLocaleString('en-EU')}</li>
            <li><span className='text-md font-bold'>Popularity: </span>{movie.popularity.toLocaleString('en-EU')}</li>
            <li><span className='text-md font-bold'>Release date: </span>{movie.release_date}</li>
          </ul>
        </div>
      </div>
    </>);
}