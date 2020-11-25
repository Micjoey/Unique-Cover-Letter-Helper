import BaseRouter from './routes'
import { BrowserRouter as Router}  from 'react-router-dom'
import './css/App.css';
import Header from './containers/Banners/Header/NavBar';
import FooterPage from './containers/Banners/Footer/FooterBar';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header/>
            <BaseRouter/> 
          <FooterPage/>
        </Router>
      </header>
    </div>
  );
}

export default App;
