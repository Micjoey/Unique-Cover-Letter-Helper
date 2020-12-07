import BaseRouter from './routes'
import { BrowserRouter as Router}  from 'react-router-dom'
import {useSelector} from 'react-redux'
import './css/App.css';
import Header from './containers/Banners/Header/NavBar';
import FooterPage from './containers/Banners/Footer/FooterBar';
import {
  Container, Segment,
} from 'semantic-ui-react'
import { createBrowserHistory } from 'history';
import rg4js from 'raygun4js';

const history = createBrowserHistory();

function App() {
  const props = useSelector(state => ({ ...state, isAuthenticated: localStorage.getItem('access_token') !== null}))
  history.listen((location, action) => {
    rg4js('trackEvent', { type: 'pageView', path: location.pathname });
  });
  return (
    <Segment inverted>
      {/* <Container> */}
        <div className="App">
          <header className="App-header">
              <Router>
                <Header {...props}/>
                <BaseRouter/> 
                <FooterPage/>
              </Router>
          </header>
        </div>
      {/* </Container> */}
    </Segment>
  );
}


export default App;
