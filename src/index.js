import React from 'react';
import { render } from "react-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";

const renderApp = Component => {
	render(
    <Router>
      <App />
    </Router>,
		document.getElementById("root")
	);
};

renderApp()
registerServiceWorker();
