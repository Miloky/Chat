import { StrictMode } from 'react';
import { render } from 'react-dom';

import Routes from './router';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const rootElement = document.getElementById('root');

render(
  <StrictMode>
    <Routes/>
  </StrictMode>,
  rootElement
);

reportWebVitals(console.log);
