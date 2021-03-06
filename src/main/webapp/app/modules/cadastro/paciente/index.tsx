import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import PacienteManagement from './paciente-management';
import PacienteManagementDialog from './paciente-management-dialog';
import ContatoManagementDialog from './paciente-management-add-contato';
import ContatoDeleteDialog from './paciente-management-delete-contato';
import PacienteManagementDeleteDialog from './paciente-management-delete-dialog';
import PacienteManagementDetail from './paciente-management-detail';

const Routes = ({ match }) => (
    <div>
        <Switch>
            <Route exact path={match.url} component={PacienteManagement}/>
            <Route exact path={`${match.url}/new`} component={PacienteManagementDialog}/>
            <Route exact path={`${match.url}/:id/edit`} component={PacienteManagementDialog}/>
            <ModalRoute exact path={`${match.url}/:id/delete`} component={PacienteManagementDeleteDialog}/>
            <Route exact path={`${match.url}/:id/edit/contato/new`} component={ContatoManagementDialog}/>
            <Route exact path={`${match.url}/:id/edit/contato/edit/:idContato`} component={ContatoManagementDialog}/>
            <Route exact path={`${match.url}/:id/edit/contato/delete/:idContato`} component={ContatoDeleteDialog}/>
            <Route exact path={`${match.url}/:id`} component={PacienteManagementDetail} />
        </Switch>
    </div>
);

export default Routes;
