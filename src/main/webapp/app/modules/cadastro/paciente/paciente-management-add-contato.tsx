import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, Av } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';
import { PubSub } from 'pubsub-js';

import { getContato } from '../../../reducers/paciente-management';
import { locales } from '../../../config/translation';

export interface IContatoManagementModelProps {
  getContato: ICrudGetAction;
  loading: boolean;
  updating: boolean;
  paciente: any;
  contato: any;
  match: any;
  history: any;
}

export interface IContatoManagementModelState {
  showModal: boolean;
  isNew: boolean;
  contato: any;
}
export class ContatoManagementDialog extends React.Component<IContatoManagementModelProps, IContatoManagementModelState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      isNew: true,
      contato: this.props.contato
    };
    PubSub.subscribe('contato-showmodal', this.handleShowModal);
  }

  handleShowModal = (msg, contato) => {
    this.setState({ showModal: true, contato });
  }

  saveContato = (event, errors, values) => {
    if (this.state.isNew) {
    }
    this.handleClose();
    PubSub.publish('paciente-atualizar-contatos', values);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isNew: !nextProps.contato.id });
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
  }

  render() {
    const isInvalid = false;
    const { paciente, loading, updating } = this.props;
    const { showModal, contato, isNew } = this.state;
    return (
      <Modal
        isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg"
      >
      <ModalHeader toggle={this.handleClose}><Translate contentKey="contatoManagement.home.createOrEditLabel">Create or edit a User</Translate></ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : contato} onSubmit={this.saveContato} >
          <ModalBody>
            { contato.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <AvInput type="hidden" className="form-control" name="uuid" value={contato.uuid} />
            </AvGroup>
            <AvGroup>
              <Label for="tipoContato"><Translate contentKey="contatoManagement.tipoContato">Código de Área</Translate></Label>
              <AvInput type="select" className="form-control" name="tipoContato" value={contato.tipoContato}>
                <option>Selecione</option>
                <option value="TELEFONE">Telefone</option>
                <option value="EMAIL">E-mail</option>
              </AvInput>
            </AvGroup>
            <AvGroup>
              <Label for="codigoArea"><Translate contentKey="contatoManagement.codigoArea">Código de Área</Translate></Label>
              <AvInput type="text" className="form-control" name="codigoArea" value={contato.codigoArea}  required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="contato"><Translate contentKey="contatoManagement.contato">Contato</Translate></Label>
              <AvInput type="text" className="form-control" name="contato" value={contato.contato} required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan/>&nbsp;
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO/>&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      }
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  paciente: storeState.pacienteManagement.paciente,
  contato: storeState.pacienteManagement.contato,
  loading: storeState.pacienteManagement.loading,
  updating: storeState.pacienteManagement.updating
});

const mapDispatchToProps = { getContato };

export default connect(mapStateToProps, mapDispatchToProps)(ContatoManagementDialog);
