import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import { getPacientes } from '../../../reducers/paciente-management';
import { APP_DATE_FORMAT, APP_ONLY_DATE_FORMAT } from '../../../config/constants';

export interface IPacienteManagementProps {
  getPacientes: ICrudGetAction;
  loading: boolean;
  pacientes: any[];
  match: any;
}

export class PacienteManagement extends React.Component<IPacienteManagementProps, undefined> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPacientes();
  }

  render() {
    const { pacientes, match, loading } = this.props;
    if (loading) {
      return(
        <div>Carregando...</div>
      );
    }
    return (
      <div>
        <h2>
          <Translate contentKey="pacienteManagement.home.title">Users</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="pacienteManagement.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="pacienteManagement.nomeCompleto">Login</Translate></th>
                <th><Translate contentKey="pacienteManagement.dataNascimento">Email</Translate></th>
                <th />
                <th><Translate contentKey="pacienteManagement.createdDate">Created Date</Translate></th>
                <th><Translate contentKey="pacienteManagement.lastModifiedBy">Last Modified By</Translate></th>
                <th><Translate contentKey="pacienteManagement.lastModifiedDate">Last Modified Date</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
              pacientes.map((paciente, i) => (
                <tr key={`paciente-${i}`}>
                  <td>
                    <Button
                      tag={Link} to={`${match.url}/${paciente.id}`}
                      color="link" size="sm"
                    >
                      {paciente.id}
                    </Button>
                  </td>
                  <td>{paciente.nomeCompleto}</td>
                  <td><TextFormat value={paciente.dataNascimento} type="date" format={APP_ONLY_DATE_FORMAT} blankOnInvalid /></td>
                  <td/>
                  <td><TextFormat value={paciente.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></td>
                  <td>{paciente.lastModifiedBy}</td>
                  <td><TextFormat value={paciente.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link} to={`${match.url}/${paciente.id}`}
                        color="info" size="sm"
                      >
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button
                        tag={Link} to={`${match.url}/${paciente.id}/edit`}
                        color="primary" size="sm"
                      >
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button
                        tag={Link} to={`${match.url}/${paciente.id}/delete`}
                        color="danger" size="sm"
                      >
                        <FaTrash/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete" /></span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  pacientes: storeState.pacienteManagement.pacientes,
  loading: storeState.pacienteManagement.loading,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getPacientes };

export default connect(mapStateToProps, mapDispatchToProps)(PacienteManagement);
