import React, { lazy, Suspense } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Landing from './components/Landing';
import Pricing from './components/Pricing';


const history = createBrowserHistory();

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});

const App = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path='/pricing' component={Pricing} />
            <Route exact path='/' component={Landing} />

          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;
