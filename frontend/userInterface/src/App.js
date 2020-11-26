import BaseRouter from './routes'
import { BrowserRouter as Router}  from 'react-router-dom'
import {connect, useDispatch, useSelector} from 'react-redux'
import './css/App.css';
import Header from './containers/Banners/Header/NavBar';
import FooterPage from './containers/Banners/Footer/FooterBar';
import * as actions from './store/actions/Auth'
import { Component, useCallback, useEffect } from 'react';



function App() {
  const props = useSelector(state => ({ ...state, isAuthenticated: state.token !== null}))
  const dispatch = useDispatch()
  const onTryAutoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  )
  

  useEffect(() => {
    onTryAutoSignup()
  }, [])

  // console.log(props)
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header {...props}/>
          <BaseRouter {...props}/> 
          <FooterPage/>
        </Router>
      </header>
    </div>
  );
}


export default App;
