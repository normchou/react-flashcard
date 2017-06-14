import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
