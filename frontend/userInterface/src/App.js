import './App.css';
import 'antd/dist/antd.css'
import CustomLayout from './containers/Layout'
import JobList from './containers/JobListView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomLayout>
          <JobList/>
        </CustomLayout>
      </header>
    </div>
  );
}

export default App;
