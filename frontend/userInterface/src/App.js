import BaseRouter from './routes'
import { BrowserRouter as Router}  from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css'
import CustomLayout from './containers/layout'
import JobList from './containers/JobListView';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {/* Place the header here */}
          <BaseRouter/> 
        </Router>
      </header>
    </div>
  );
}

export default App;
