import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routers/router';

class App extends React.Component {
  public render() {
    return (
      <div id="app">
        <Router>
          <AppRouter />
        </Router>
      </div>
    );
  }
}

export default App;
