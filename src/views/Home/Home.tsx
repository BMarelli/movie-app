import React, { useEffect, useState } from 'react'
import Client, { FetchError } from '../../util/Client';

/* Components */
import { MovieCard, Error } from '../../components';

/* Types */
import { MovieInfo } from '../../types';

interface HomeProps {
  client: Client;
}

export const Home: React.FC<HomeProps> = ({ client }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    const page = sessionStorage.getItem('page');
    if (page) setPage(parseInt(page));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setMovies(await client.getMovies(page));
        setLoading(false);
      } catch (e) {
        if (e instanceof FetchError) setErrorText(e.message);
      }
    }

    fetchData();
  }, [page]);

  const handleChange = (i: number) => {
    sessionStorage.setItem('page', String(page + i));
    setPage(page + i);
  };

  if (errorText) return <Error text={errorText} />;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className='flex justify-evenly mb-4'>
        <button onClick={() => { if (page > 1) handleChange(-1) }} className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'>
          <i className="m-auto fa fa-arrow-left"></i>
        </button>
        <span>{page}</span>
        <button onClick={() => handleChange(+1)} className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'>
          <i className="m-auto fa fa-arrow-right"></i>
        </button>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 justify-center'>
        {movies.map((movie: MovieInfo) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </>);
}