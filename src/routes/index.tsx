import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

/** exact used for check if the route is exact in path */
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repositories/:repository+" component={Repository} />
    {/*+ indica que     tudo que vie depos da barra e um parametro */}
  </Switch>
);

export default Routes;
