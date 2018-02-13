import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getContato } from '../../../../reducers/contato-management';
import { PubSub } from 'pubsub-js';

export interface IContatoManagementDialogProps {
    updating: boolean;
    loading: boolean;
    match: any;
    showModal: boolean;
    contato: any;
}

export interface IContatoManagementDialogState {
    showModal: boolean;
}

export default class ContatoManagementDialog extends React.Component<IContatoManagementDialogProps, IContatoManagementDialogState> {

    constructor(props) {
        super(props);
        this.state = { showModal: false };
        PubSub.subscribe('contato-showmodal', this.handleShowModal);
    }

    handleShowModal = (msg, contato) => {
        this.setState({ showModal: true });
    }

    handleClose = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { updating, loading, match, showModal, contato } = this.props;
        const isNew = !contato.id;
        return (
            <Modal
              isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 20 }}
              toggle={this.handleClose} size="lg">
                <ModalHeader toggle={this.handleClose}><Translate contentKey="contatoManagement.home.createOrEditLabel">Create or edit a Contato</Translate></ModalHeader>
                {loading ? <p>Carregando...</p>
                : <AvForm model={isNew ? {} : contato} >
                    <ModalBody>
                        {contato.id ?
                            <AvGroup>
                                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>                            </AvGroup>
                        : null}
                        <AvGroup>
                            <Label for="tipoContato"><Translate contentKey="contatoManagement.tipoContato">Tipo de Contato</Translate></Label>
                            <AvInput type="select" className="form-control" name="tipoContato">
                                <option value="TELEFONE">Telefone</option>
                                <option value="EMAIL">E-mail</option>
                            </AvInput>
                        </AvGroup>
                        <AvGroup>
                            <Label for="codigoArea"><Translate contentKey="contatoManagement.codigoArea">Código de Área</Translate></Label>
                            <AvInput type="text" className="form-control" name="codigoArea"/>
                        </AvGroup>
                        <AvGroup>
                            <Label for="contato"><Translate contentKey="contatoManagement.contato">Contato</Translate></Label>
                            <AvInput type="text" className="form-control" name="contato"/>
                        </AvGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose}>
                            <Translate contentKey="entity.action.cancel">Cancelar</Translate>
                        </Button>
                        <Button color="primary" type="submit">
                            <Translate contentKey="entity.action.save">Salvar</Translate>
                        </Button>
                    </ModalFooter>
                </AvForm>
            }
            </Modal>
        );
    }

}
