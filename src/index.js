import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

// CSS utility
import './style/util.css';

// Aesthetic definitions 
import './style/definitions.css';
import './style/themes/default.css';
import './style/themes/dark.css';

// Controls and sheets
import './style/controls.css';
import './style/surfaces.css';
import './style/lists.css';
import './style/article.css';
import './style/main.css';

// Animation
import './style/animation.css';
import './style/interactive.css';

// Fonts
import './assets/fonts/public_sans.css';
import './assets/fonts/bitter.css';
import './assets/fonts/roboto_mono.css';

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
