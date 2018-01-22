import * as React from 'react';
import { Route } from 'react-router-dom';

import PacienteManagement from './paciente';

const Routes = ({match}) => (
    <div>
        <Route path={`${match.url}/paciente`} component={PacienteManagement}/>
    </div>
);

export default Routes;
