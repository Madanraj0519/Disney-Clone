import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Componets/Header';
import Home from './Componets/Home';
import Login from './Componets/Login';
import Details from './Componets/Details';
import WatchList from './Componets/WatchList';
import Search from './Componets/Search';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/detail/:id' element={<Details />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/search' element={<Search />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
