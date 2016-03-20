
// Load Styles
require('./styles.less');

// Load JS
import React from 'react';
import { render } from 'react-dom';
import App from './scripts/app.jsx';

render(<App />, document.getElementById('app'));

