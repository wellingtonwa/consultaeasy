import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';
import ListaContato from './lista-contato';
import { getPaciente } from '../../../reducers/paciente-management';
import { getContatos } from '../../../reducers/contato-management';
import { APP_DATE_FORMAT, APP_ONLY_DATE_FORMAT } from '../../../config/constants';

export interface IAlunoManagementDetailProps {
  getPaciente: ICrudGetAction;
  getContatos: ICrudGetAction;
  paciente: any;
  contatos: any[];
  match: any;
}
export class PacienteManagementDetail extends React.Component<IAlunoManagementDetailProps, undefined> {

  componentDidMount() {
    this.props.getPaciente(this.props.match.params.id);
    this.props.getContatos(this.props.match.params.id);
  }

  render() {
    const { paciente, contatos } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="pacienteManagement.detail.title">User</Translate> [<b>{paciente.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt><Translate contentKey="pacienteManagement.nomeCompleto">First Name</Translate></dt>
          <dd>{paciente.nomeCompleto}</dd>
          <dt><Translate contentKey="pacienteManagement.dataNascimento">Created Date</Translate></dt>
          <dd><TextFormat value={paciente.dataNascimento} type="date" format={APP_ONLY_DATE_FORMAT} blankOnInvalid /></dd>
          <dt><Translate contentKey="pacienteManagement.createdBy">Created By</Translate></dt>
          <dd>{paciente.createdBy}</dd>
          <dt><Translate contentKey="pacienteManagement.createdDate">Created Date</Translate></dt>
          <dd><TextFormat value={paciente.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></dd>
          <dt><Translate contentKey="pacienteManagement.lastModifiedBy">Last Modified By</Translate></dt>
          <dd>{paciente.lastModifiedBy}</dd>
          <dt><Translate contentKey="pacienteManagement.lastModifiedDate">Last Modified Date</Translate></dt>
          <dd><TextFormat value={paciente.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></dd>
        </dl>
        <div>
          <h2>Contato(s)</h2>
          <Table>
              <thead>
              <tr>
                  <th>Tipo contato</th>
                  <th>Código de Área</th>
                  <th>Contato</th>
                  <th><Translate contentKey="pacienteManagement.createdDate">Criado em</Translate></th>
              </tr>
              </thead>
              <tbody>
                  {contatos.length === 0 ?
                      <tr>
                          <td colSpan={4} style={{ textAlign: 'center' }}>Nenhum contato cadastrado</td>
                      </tr>
                      : contatos.map((contato, i) => (
                          <tr key={i}>
                              <td><Translate contentKey={`tipoContato.${contato.tipoContato}`}>Tipo de Contato</Translate></td>
                              <td>{contato.codigoArea}</td>
                              <td>{contato.contato}</td>
                              <td><TextFormat value={contato.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></td>
                          </tr>
                      ))
                  }
              </tbody>
          </Table>
        </div>
        <Button
          tag={Link} to="/cadastro/paciente" replace
          color="info"
        >
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  paciente: storeState.pacienteManagement.paciente,
  contatos: storeState.contatoManagement.contatos
});

const mapDispatchToProps = { getPaciente, getContatos };

export default connect(mapStateToProps, mapDispatchToProps)(PacienteManagementDetail);
