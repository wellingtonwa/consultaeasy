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
import { getContatos, getContato } from '../../../reducers/contato-management';
import { locales } from '../../../config/translation';
import { Link } from 'react-router-dom';
import { error } from 'util';

export interface IPacienteManagementModelProps {
  getPaciente: ICrudGetAction;
  getContatos: ICrudGetAction;
  getContato: ICrudGetAction;
  updatePaciente: ICrudPutAction;
  createPacienteContinue: ICrudPutAction;
  loading: boolean;
  loadingContato: boolean;
  updating: boolean;
  updatingContato: boolean;
  paciente: any;
  contatos: any[];
  match: any;
  history: any;
}

export interface IPacienteManagementModelState {
  showModal: boolean;
  isNew: boolean;
  paciente: any;
  hasErrors: boolean;
  avForm: any;
  firstField: any;
  firstFieldRef: any;
}

export class PacienteManagementDialog extends React.Component<IPacienteManagementModelProps, IPacienteManagementModelState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      isNew: !this.props.match.params || !this.props.match.params.id,
      paciente: !this.props.match.params || !this.props.match.params.id ? {} : this.props.paciente,
      hasErrors: false,
      avForm: null,
      firstField: null,
      firstFieldRef: null
    };
  }

  async componentDidMount() {
    if (!this.state.isNew) {
      const result = await this.props.getPaciente(this.props.match.params.id);
      this.setState({ paciente: result.value.data });
    } else {
      this.setState({ paciente: {} });
    }
    this.atualizarContatos();
  }

  atualizarContatos() {
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
    this.props.history.push('/cadastro/paciente');
  }

  savePacienteAndAddContato = async (event, errors, values) => {
    if (errors.length === 0) {
      const result = await this.props.createPacienteContinue(values);
      this.props.history.push(`/cadastro/paciente/${result.value.data.id}/edit/contato/new`);
    }
  }

  handleNomeCompletoOnChange = (event, data) => {
    const { paciente } = this.state;
    paciente.nomeCompleto = data;
    this.setState({ paciente });
  }

  handleDataNascimentoOnChange = (event, data, dados) => {
    const { paciente } = this.state;
    paciente.dataNascimento = data;
    this.setState(paciente);
  }

  submitFormAndAddContact = async () => {
    let idPaciente = null;
    const validationResult = await this.state.avForm.validateAll(this.state.paciente);
    if (!validationResult.isValid) {
      return;
    }
    if (this.state.isNew) {
      const result = await this.props.createPacienteContinue(this.state.paciente);
      idPaciente = result.value.data.id;
    } else {
      this.props.updatePaciente(this.state.paciente);
      idPaciente = this.state.paciente.id;
    }
    this.props.history.push(`/cadastro/paciente/${idPaciente}/edit/contato/new`);
  }

  submitForm = async () => {
    const validationResult = await this.state.avForm.validateAll(this.state.paciente);

    if (!validationResult.isValid) {
      return;
    }

    if (this.state.isNew) {
      this.props.createPacienteContinue(this.state.paciente);
    } else {
      this.props.updatePaciente(this.state.paciente);
    }
    this.handleClose();
  }

  setAvFormInstance = comp => {
    this.setState({ avForm: comp });
  }

  setFirstField = comp => {
    this.setState({ firstField: comp });
  }

  setFirstFieldRef = comp => {
    this.setState({ firstFieldRef: comp });
  }

  render() {
    const isInvalid = false;
    const { loading, updating, match, history, contatos } = this.props;
    const { paciente, showModal, isNew, hasErrors } = this.state;
    return (
      <div>
        <h2>
          <Translate contentKey="pacienteManagement.home.createOrEditLabel">Create or edit a User</Translate>
        </h2>
        {loading ? <p>Loading...</p>
          : <AvForm model={paciente} ref={this.setAvFormInstance} >
            {!isNew ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly />
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label for="nomeCompleto"><Translate contentKey="pacienteManagement.nomeCompleto">Login</Translate></Label>
              <AvInput type="text" className="form-control" name="nomeCompleto"
              value={paciente.nomeCompleto} onChange={this.handleNomeCompletoOnChange}
              innerRef={this.setFirstFieldRef} autoFocus required/>
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="dataNascimento"><Translate contentKey="pacienteManagement.dataNascimento">First Name</Translate></Label>
              <AvInput type="date" className="form-control" value={paciente.dataNascimento} name="dataNascimento" onChange={this.handleDataNascimentoOnChange}/>
            </AvGroup>
            <h3>Contato(s)
              <Button color="primary" className="btn btn-primary float-right jh-create-entity" onClick={this.submitFormAndAddContact}>
                Add Contato
              </Button>
            </h3>
            <ListaContato contatos={!isNew ? contatos : []} />
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan />&nbsp;
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating} onClick={this.submitForm}>
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
  contato: storeState.contatoManagement.contato,
  loading: storeState.pacienteManagement.loading,
  loadingContato: storeState.contatoManagement.loading,
  updatingContato: storeState.contatoManagement.updating,
  updating: storeState.pacienteManagement.updating
});

const mapDispatchToProps = {
  getPaciente,
  updatePaciente,
  createPacienteContinue,
  getContatos,
  getContato
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteManagementDialog);
