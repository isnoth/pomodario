import React from 'react';
import { render } from "react-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { routingStore, vimStore, tooltipStore, authStore, noteStore, uiStore, todoStore } from './store/store'
import { Provider } from 'mobx-react';
import  './utils/debug.js'


import { HashRouter as Router, Route } from "react-router-dom";
import createBrowserHistory from 'history/createHashHistory';
import { syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);

const renderApp = Component => {
	render(
    <Provider
      routingStore={routingStore}
      vimStore={vimStore}
      tooltipStore={tooltipStore}
      authStore={authStore}
      noteStore={noteStore}
      uiStore={uiStore}
      todoStore={todoStore}
      >
       <App/>
    </Provider>,
		document.getElementById("root")
	);
};

renderApp()
registerServiceWorker();
