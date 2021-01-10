import { StrictMode } from 'react';
import { render } from 'react-dom';

import Routes from './router';
import reportWebVitals from './reportWebVitals';
import userService from './services/user-service';

import './index.scss';


const rootElement = document.getElementById('root');

userService.getContacts().then(({ data })=>console.log(data)).catch(err=>console.log(err));


render(
  <StrictMode>
    <Routes/>
  </StrictMode>,
  rootElement
);

reportWebVitals(console.log);
