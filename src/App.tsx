import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Client from './util/Client';

/* Views */
import { Home, Movie } from './views';


function App() {
  const client = new Client("https://api.themoviedb.org/3");

  return (
    <div className='flex flex-col h-screen'>
      <header className='mb-5 py-4 px-5 bg-slate-500 text-white'>
        <Link to="/"><p className='bg-slate-400 text-xl rounded-lg p-4 w-fit'>Movies App</p></Link>
      </header>
      <div className='grow container my-2 mx-auto'>
        <Routes>
          <Route path='/' element={<Home client={client} />} />
          <Route path='movie/:id' element={<Movie client={client} />} />
        </Routes>
      </div>
      <footer className='py-5 px-5 bg-slate-500 text-white text-right flex justify-between'>
        <Link to="https:/github.com/BMarelli"><i className="fab fa-github social"></i> Bautista Marelli</Link>
        <p>© 2023</p>
      </footer>
    </div>
  );
}

export default App;
