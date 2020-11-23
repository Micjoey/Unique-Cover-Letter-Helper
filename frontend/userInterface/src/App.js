import BaseRouter from './routes'
import { BrowserRouter as Router}  from 'react-router-dom'
import './App.css';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {/* Place the header here */}
          <BaseRouter/> 
          {/* Place the footer here */}
        </Router>
      </header>
    </div>
  );
}

export default App;
