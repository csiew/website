import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import './style/index.css';
import './style/animation.css';
import './style/util.css';
import './style/themes/default.css';
import './style/themes/dark.css';
import './assets/fonts/lt_amber.css';
import './assets/fonts/fraunces.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
