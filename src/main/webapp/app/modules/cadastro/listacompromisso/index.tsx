import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import ListaCompromisso from './lista-compromisso';
import Agenda from "../agenda/agenda";

const Routes = ({ match }) => (
    <div>
        <Switch>
            <Route exact path={match.url} component={ListaCompromisso}/>
            <Route exact path={`${match.url}/:id/(new|edit|delete)`} component={ListaCompromisso}/>
        </Switch>
    </div>
);

export default Routes;
