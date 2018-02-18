import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FaBan, FaTrash } from 'react-icons/lib/fa';

import { getPaciente, deletePaciente } from '../../../reducers/paciente-management';

export interface IPacienteManagementDeleteModalProps {
  getPaciente: ICrudGetAction;
  deletePaciente: ICrudDeleteAction;
  paciente: any;
  match: any;
  history: any;
}

export interface IPacienteManagementDeleteModalState {
  showModal: boolean;
}
export class PacienteManagementDeleteDialog extends React.Component<IPacienteManagementDeleteModalProps, IPacienteManagementDeleteModalState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
    console.log(this.props.match);
  }

  componentDidMount() {
    this.props.getPaciente(this.props.match.params.id);
  }

  confirmDelete = () => {
    this.props.deletePaciente(this.props.paciente.id);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/cadastro/paciente');
  }

  render() {
    const { paciente } = this.props;
    const { showModal } = this.state;
    return (
      <Modal
        isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose}
      >
      <ModalHeader toggle={this.handleClose}><Translate contentKey="entity.delete.title">Confirm delete operation</Translate></ModalHeader>
      <ModalBody>
        <Translate contentKey="pacienteManagement.delete.question" interpolate={{ nome: paciente.nomeCompleto }}>Are you sure you want to delete this User?</Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.handleClose}>
          <FaBan/>&nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="danger" onClick={this.confirmDelete}>
          <FaTrash/>&nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  paciente: storeState.pacienteManagement.paciente
});

const mapDispatchToProps = { getPaciente, deletePaciente };

export default connect(mapStateToProps, mapDispatchToProps)(PacienteManagementDeleteDialog);
