import * as React from 'react';
import { Route } from 'react-router-dom';

import PacienteManagement from './paciente';
import MarcadorManagement from './marcador';
import AgendaManagement from './agenda';

const Routes = ({ match }) => (
    <div>
        <Route path={`${match.url}/paciente`} component={PacienteManagement}/>
        <Route path={`${match.url}/marcador`} component={MarcadorManagement}/>
        <Route path={`${match.url}/agenda`} component={AgendaManagement}/>
    </div>
);

export default Routes;
