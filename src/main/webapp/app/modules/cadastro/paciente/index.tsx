import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import PacienteManagement from './paciente-management';
import PacienteManagementDialog from './paciente-management-dialog';
import PacienteManagementDetail from './paciente-management-detail';

const Routes = ({match}) => (
    <div>
        <Switch>
            <Route exact path={match.url} component={PacienteManagement}/>
            <ModalRoute exact path={`${match.url}/new`} component={PacienteManagementDialog}/>
            <ModalRoute exact path={`${match.url}/:id/edit`} component={PacienteManagementDialog}/>
            <Route exact path={`${match.url}/:id`} component={PacienteManagementDetail} />
        </Switch>
    </div>
);

export default Routes;