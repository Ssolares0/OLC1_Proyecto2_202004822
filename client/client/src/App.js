
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/Style.css';
import { Home } from './Components/Home';

function App() {
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  return (
    <Router>
      <Routes>
      <Route path="/"  />
        <Route path="/Home" element={<Home/>}></Route>
      </Routes>
    </Router>

  )
}

export default App;
