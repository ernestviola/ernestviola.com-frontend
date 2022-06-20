import './styles/App.css';
import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Blogs from './components/blog/Blogs'
import Home from './components/home/Home'
import NotFound from './components/notfound/NotFound'
import Projects from './components/project/Projects';
import Login from './components/authorization/Login';
import Logout from './components/authorization/Logout';
import CheckUser from './components/authorization/CheckUser';


import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  const date = new Date();
  const year = date.getYear() + 1900;
  

  return (
      <div className='wrapper'>
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/projects' element={<Projects/>} />
            <Route path ='/login' element={<Login/>} />
            <Route path ='/logout' element={<Logout/>} />
            <Route path ='/checkuser' element={<CheckUser/>} />
            <Route path ='*' element={<NotFound/>} />
          </Routes>    
          

          {/* <nav>
            <ol>
            <li><Link to='/' >Blogs</Link></li>
              <li><Link to='/manatee' >Manatee</Link></li>
              <li><Link to='/narwhal' >Narwhal</Link></li>
              <li><Link to='/whale' >Whale</Link></li>
            </ol>
          </nav> */}
        </BrowserRouter>
        <footer>
          <hr />
          <div>© {year} Ernest Viola</div>
        </footer>
      </div>

  );
}

export default App;
