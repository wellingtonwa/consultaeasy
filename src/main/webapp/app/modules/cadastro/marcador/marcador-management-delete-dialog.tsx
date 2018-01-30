import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FaBan, FaTrash } from 'react-icons/lib/fa';

import { getMarcador, deleteMarcador } from '../../../reducers/marcador-management';

export interface IMarcadorManagementDeleteModalProps {
  getMarcador: ICrudGetAction;
  deleteMarcador: ICrudDeleteAction;
  marcador: any;
  match: any;
  history: any;
}

export interface IMarcadorManagementDeleteModalState {
  showModal: boolean;
}
export class MarcadorManagementDeleteDialog extends React.Component<IMarcadorManagementDeleteModalProps, IMarcadorManagementDeleteModalState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
  }

  componentDidMount() {
    this.props.getMarcador(this.props.match.params.id);
  }

  confirmDelete = () => {
    this.props.deleteMarcador(this.props.marcador.id);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/cadastro/marcador');
  }

  render() {
    const { marcador } = this.props;
    const { showModal } = this.state;
    return (
      <Modal
        isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose}
      >
      <ModalHeader toggle={this.handleClose}><Translate contentKey="entity.delete.title">Confirm delete operation</Translate></ModalHeader>
      <ModalBody>
        <Translate contentKey="marcadorManagement.delete.question" interpolate={{ nome: marcador.nome }}>Are you sure you want to delete this User?</Translate>
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
  marcador: storeState.marcadorManagement.marcador
});

const mapDispatchToProps = { getMarcador, deleteMarcador };

export default connect(mapStateToProps, mapDispatchToProps)(MarcadorManagementDeleteDialog);
