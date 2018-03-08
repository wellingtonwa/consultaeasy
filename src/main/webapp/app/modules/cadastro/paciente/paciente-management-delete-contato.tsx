import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { PubSub } from 'pubsub-js';
import { Translate } from 'react-jhipster';
import { getContato, deleteContato } from '../../../reducers/contato-management';
import { getPaciente } from '../../../reducers/paciente-management';

export interface IContatoManagementProps {
    contato: any;
    match: any;
    history: any;
    loading: boolean;
    getContato: any;
    deleteContato: any;
    getPaciente: any;
}

export class ContatoDeleteDialog extends React.Component<IContatoManagementProps, null> {

    constructor(props) {
        super(props);
        PubSub.subscribe('contato-delete-showmodal', this.handleShowModal);
        this.props.getContato(this.props.match.params.idContato);
    }

    handleShowModal = (msg, contato) => {
        this.setState({ contato });
    }

    handleClose = (event, id) => {
        if (id) {
            this.props.history.push(`/cadastro/paciente/${id}/edit`);
        } else {
            this.props.history.push(`/cadastro/paciente/${this.props.contato.idPaciente}/edit`);
        }
    }

    confirmDelete = (contato, event) => {
        this.handleClose(contato.idPaciente, null);
        this.props.deleteContato(contato.id);
    }

    render() {
        const { contato, loading } = this.props;
        return (
            <div>
                <h2><Translate contentKey="entity.delete.title">Delete Title</Translate></h2>
                {loading ? <p>Carregando...</p>
                 : <div>
                        <Translate contentKey="contatoManagement.delete.question" interpolate={{ contato: contato.contato }}>delete question</Translate>
                        <div>
                            <Button color="secondary" onClick={this.handleClose.bind(event, null)}>
                                <Translate contentKey="entity.action.cancel">Cancel</Translate>
                            </Button>
                            <Button color="primary" onClick={this.confirmDelete.bind(event, contato)}>
                                <Translate contentKey="entity.action.delete">Confirm</Translate>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    paciente: storeState.pacienteManagement.paciente,
    contatos: storeState.contatoManagement.contatos,
    contato: storeState.contatoManagement.contato,
    loading: storeState.contatoManagement.loading,
    updating: storeState.contatoManagement.updating
  });

const mapDispatchToProps = {
    deleteContato,
    getContato,
    getPaciente
  };

export default connect(mapStateToProps, mapDispatchToProps)(ContatoDeleteDialog);
