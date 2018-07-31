import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App initialWidth = {4} initialHeight = {4} cellSize = {50}/>, document.getElementById('root'));
registerServiceWorker();
