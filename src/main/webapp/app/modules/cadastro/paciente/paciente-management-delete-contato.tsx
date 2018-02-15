import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { PubSub } from 'pubsub-js';
import { Translate } from 'react-jhipster';

export interface IContatoManagementState {
    showModal: boolean;
    contato: any;
}

export default class ContatoDeleteDialog extends React.Component<null, IContatoManagementState> {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contato: {}
        };
        PubSub.subscribe('contato-delete-showmodal', this.handleShowModal);
    }

    handleShowModal = (msg, contato) => {
        this.setState({ contato, showModal: true });
    }

    handleClose = () => {
        this.setState({ showModal: false });
    }

    confirmDelete = (contato, event) => {
        PubSub.publish('paciente-delete-contato', contato);
        this.handleClose();
    }

    render() {
        const { showModal, contato } = this.state;
        return (
            <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 20 }}
                toggle={this.handleClose} size="lg">
                <ModalHeader toggle={this.handleClose}><Translate contentKey="entity.delete.title">Delete Title</Translate> </ModalHeader>
                <ModalBody><Translate contentKey="contatoManagement.delete.question" interpolate={{ contato: contato.contato }}>delete question</Translate></ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleClose}>
                        <Translate contentKey="entity.action.cancel">Cancel</Translate>
                    </Button>
                    <Button color="primary" onClick={this.confirmDelete.bind(event, contato)}>
                        <Translate contentKey="entity.action.delete">Confirm</Translate>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
