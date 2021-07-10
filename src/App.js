import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Home';
import Covid from './Covid';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route  path="/covidpage"><Covid /></Route>
          <Route  path="/"><Home /></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
