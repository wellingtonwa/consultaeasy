import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getPaciente, updatePaciente, createPaciente } from '../../../reducers/paciente-management';
import { locales } from '../../../config/translation';

export interface IPacienteManagementModelProps {
  getPaciente: ICrudGetAction;
  updatePaciente: ICrudPutAction;
  createPaciente: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  paciente: any;
  match: any;
  history: any;
}

export interface IPacienteManagementModelState {
  showModal: boolean;
  isNew: boolean;
}
export class PacienteManagementDialog extends React.Component<IPacienteManagementModelProps, IPacienteManagementModelState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getPaciente(this.props.match.params.id);
  }

  savePaciente = (event, errors, values) => {
    if (this.state.isNew) {
      this.props.createPaciente(values);
    } else {
      this.props.updatePaciente(values);
    }
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/cadastro/paciente');
  }

  render() {
    const isInvalid = false;
    const { paciente, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal
        isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg"
      >
      <ModalHeader toggle={this.handleClose}><Translate contentKey="pacienteManagement.home.createOrEditLabel">Create or edit a User</Translate></ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : paciente} onSubmit={this.savePaciente} >
          <ModalBody>
            { paciente.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
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
  loading: storeState.pacienteManagement.loading,
  updating: storeState.pacienteManagement.updating
});

const mapDispatchToProps = { getPaciente, updatePaciente, createPaciente };

export default connect(mapStateToProps, mapDispatchToProps)(PacienteManagementDialog);
