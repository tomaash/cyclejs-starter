import {run} from '@cycle/core';
import {rerunner, restartable} from 'cycle-restart';

// css
import '../styles/app.css';

// drivers
import {makeDOMDriver} from '@cycle/dom';

import App from './components/App';

const drivers = {
  DOM: restartable(makeDOMDriver('#root'), {pauseSinksWhileReplaying: false})
};

const rerun = rerunner( run );
rerun( App, drivers );

if (module.hot) {
  module.hot.accept(`./components/App`, () => {
    const app = require(`./components/App` ).default;
    rerun( app, drivers );
  });
  module.hot.accept();
}

