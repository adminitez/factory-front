import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import MainPage from './pages/main/Main';
import ProductCountPage from './pages/product-count/ProductCount'
import history from './history';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/product-count/:purchaseOrderId" component={ProductCountPage} />
        </Switch>
    </Router>
);

export default Routes