import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import Agenda from './agenda';

const Routes = ({ match }) => (
    <div>
        <Switch>
            <Route exact path={match.url} component={Agenda}/>
            <Route exact path={`${match.url}/:id/edit`} component={Agenda}/>
        </Switch>
    </div>
);

export default Routes;
