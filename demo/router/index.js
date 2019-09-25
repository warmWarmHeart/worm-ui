import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Button from '../button';
import Icon from '../icon';

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/icon" component={Icon}/>
            <Route exact path="/button" component={Button}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;
