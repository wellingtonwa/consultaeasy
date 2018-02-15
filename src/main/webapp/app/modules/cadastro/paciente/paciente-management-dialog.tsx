import * as React from 'react';
import { PubSub } from 'pubsub-js';
import { connect } from 'react-redux';
import { Button, Label, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';
import { v4 } from 'uuid';

import ListaContato from './lista-contato';
import { getPaciente, updatePaciente, createPacienteContinue } from '../../../reducers/paciente-management';
import { getContatos } from '../../../reducers/contato-management';
import { locales } from '../../../config/translation';
import { Link } from 'react-router-dom';
import ContatoManagementDialog from './paciente-management-add-contato';
import ContatoDeleteDialog from './paciente-management-delete-contato';
import { error } from 'util';

export interface IPacienteManagementModelProps {
  getPaciente: ICrudGetAction;
  getContatos: ICrudGetAction;
  updatePaciente: ICrudPutAction;
  createPacienteContinue: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  paciente: any;
  contatos: any[];
  contato: any;
  match: any;
  history: any;
}

export interface IPacienteManagementModelState {
  showModal: boolean;
  showCadastroContrato: boolean;
  isNew: boolean;
  contatos: any[];
}

export class PacienteManagementDialog extends React.Component<IPacienteManagementModelProps, IPacienteManagementModelState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      isNew: !this.props.match.params || !this.props.match.params.id,
      showCadastroContrato: false,
      contatos: this.props.contatos
    };
    PubSub.subscribe('paciente-atualizar-contatos', this.saveContato);
    PubSub.subscribe('paciente-delete-contato', this.deleteContato);
  }

  componentDidMount() {
    !this.state.isNew && this.props.getPaciente(this.props.match.params.id);
    !this.state.isNew && this.props.getContatos(this.props.match.params.id);
  }

  savePacienteAndClose = (event, errors, values) => {
    this.savePaciente(event, errors, values);
    this.handleClose();
  }

  savePaciente(event, errors, values) {
    if (this.state.isNew) {
      this.props.createPacienteContinue(values);
    } else {
      this.props.updatePaciente(values);
    }
  }

  handleClose = () => {
    this.setState({
      showModal: false
    });
    this.props.history.push('/cadastro/paciente');
  }

  savePacienteAndAddContato = (event, errors, values) => {
    if (errors.length === 0) {
      this.savePaciente(event, errors, values);
      this.addContato();
    }
  }

  addContato = () => {
    const novoContato = { uuid: v4(), pacienteId: this.props.paciente.id, tipoContato: 'TELEFONE', codigoArea: '32' };
    PubSub.publish('contato-showmodal', novoContato);
  }

  saveContato = (msg, auxContato) => {
    const contatos = this.state.contatos;
    let indice = -1;
    contatos.map((item, index) => {
      if (item.uuid === auxContato.uuid) {
        indice = index;
      }
    });
    if (indice >= 0) {
      contatos[indice] = auxContato;
    } else {
      contatos.push(auxContato);
    }
    this.setState({ contatos });
  }

  deleteContato = (msg, auxContato) => {
    const contatos = this.state.contatos;
    contatos.map((item, index) => { item.uuid === auxContato.uuid && contatos.splice(index, 1); });
    this.setState({ contatos });
  }

  render() {
    const isInvalid = false;
    const { paciente, loading, updating, match, contato } = this.props;
    const { showModal, isNew, contatos } = this.state;
    return (
      <div>
        <h2>
          <Translate contentKey="pacienteManagement.home.createOrEditLabel">Create or edit a User</Translate>
        </h2>
        {loading ? <p>Loading...</p>
          : <AvForm model={!paciente.id ? {} : paciente} onSubmit={!isNew ? this.savePacienteAndClose : this.savePacienteAndAddContato} >
            {paciente.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly />
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label for="nomeCompleto"><Translate contentKey="pacienteManagement.nomeCompleto">Login</Translate></Label>
              <AvInput type="text" className="form-control" name="nomeCompleto" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="dataNascimento"><Translate contentKey="pacienteManagement.dataNascimento">First Name</Translate></Label>
              <AvInput type="date" className="form-control" name="dataNascimento" />
            </AvGroup>
            <h3>Contato(s)
                {paciente.id ?
                  <Button onClick={this.addContato}>
                    Add Contato
                  </Button>
                :
                  <Button type="submit">
                    Add Contato
                  </Button>
                }
            </h3>
            <ListaContato contatos={contatos} />
            <ContatoManagementDialog loading={loading} updating={updating}
              match={match} contato={contato} showModal={showModal} />
            <ContatoDeleteDialog/>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan />&nbsp;
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO />&nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </AvForm>
        }
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  paciente: storeState.pacienteManagement.paciente,
  contatos: storeState.contatoManagement.contatos,
  loading: storeState.pacienteManagement.loading,
  updating: storeState.pacienteManagement.updating
});

const mapDispatchToProps = {
  getPaciente,
  updatePaciente,
  createPacienteContinue,
  getContatos
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteManagementDialog);
