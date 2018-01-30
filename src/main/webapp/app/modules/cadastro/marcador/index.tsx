import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import MarcadorManagement from './marcador-management';
import MarcadorManagementDialog from './marcador-management-dialog';
import MarcadorManagementDeleteDialog from './marcador-management-delete-dialog';
import MarcadorManagementDetail from './marcador-management-detail';

const Routes = ({ match }) => (
    <div>
        <Switch>
            <Route exact path={match.url} component={MarcadorManagement}/>
            <ModalRoute exact path={`${match.url}/new`} component={MarcadorManagementDialog}/>
            <ModalRoute exact path={`${match.url}/:id/edit`} component={MarcadorManagementDialog}/>
            <ModalRoute exact path={`${match.url}/:id/delete`} component={MarcadorManagementDeleteDialog}/>
            <Route exact path={`${match.url}/:id`} component={MarcadorManagementDetail} />
        </Switch>
    </div>
);

export default Routes;
