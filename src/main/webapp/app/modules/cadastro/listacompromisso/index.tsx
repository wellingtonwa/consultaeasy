import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import ListaCompromisso from './lista-compromisso';

const Routes = ({ match }) => (
    <div>
        <Switch>
            <Route exact path={match.url} component={ListaCompromisso}/>
        </Switch>
    </div>
);

export default Routes;
