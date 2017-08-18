import React from 'react';
import { render } from "react-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { routingStore } from './store/store'
import { Provider } from 'mobx-react';

import { BrowserRouter as Router, HashRouter} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);

const renderApp = Component => {
	render(
    <Provider routingStore={routingStore}>
    <Router history={history}>
      <App />
    </Router>
    </Provider>,
		document.getElementById("root")
	);
};

renderApp()
registerServiceWorker();
