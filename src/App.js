import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
