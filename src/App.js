import BaseRouter from './routes'
import { BrowserRouter as Router}  from 'react-router-dom'
import {connect, useDispatch, useSelector} from 'react-redux'
import './css/App.css';
import Header from './containers/Banners/Header/NavBar';
import FooterPage from './containers/Banners/Footer/FooterBar';
import * as actions from './store/actions/Auth'
import { Component, useCallback, useEffect } from 'react';



function App() {
  const props = useSelector(state => ({ ...state, isAuthenticated: localStorage.getItem('access_token') !== null}))
  
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header {...props}/>
          <BaseRouter/> 
          <FooterPage/>
        </Router>
      </header>
    </div>
  );
}


export default App;