import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//componentes
import Header from './components/Header';
import Body from './components/Body';

//getElemnt
const header = document.getElementById('header');
const body = document.getElementById('body');

ReactDOM.render(<Header/>,header);
ReactDOM.render(<Body/>,body);

serviceWorker.unregister();
