import * as React from 'react';
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getCompromisso, updateCompromisso, createCompromisso } from '../../../reducers/compromisso-management';

export default class AgendaAddCompromisso extends React.Component {

  render() {
    const { loading, isNew, compromisso, showModal, handleCloseFunction } = this.props;
    return (
      <Modal isOpen={showModal} size="lg" handleClose={handleCloseFunction}>
        <ModalHeader>
          <Translate contentKey="contatoManagement.home.createOrEditLabel">
            Create or edit a Compromisso
          </Translate>
        </ModalHeader>
        ({loading ? <span>carregando...</span>
          : <AvForm model={isNew ? {} : compromisso}>
            <ModalBody>
              {!isNew
                ? <AvGroup>
                  <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                  <AvInput type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
                : null
              }
              <AvGroup>
                <Label for="title"><Translate contentKey="contatoManagement.titulo">Título</Translate></Label>
                <AvInput name="title" className="form-control" autoFocus required />
                <AvFeedback>Este campo é obrigatório</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="descricao"><Translate contentKey="contatoManagement.descricao">Descricao</Translate></Label>
                <AvInput name="descricao" className="form-control" />
              </AvGroup>
              <AvGroup>
                <Label for="start"><Translate contentKey="pacienteManagement.dataInicio">First Name</Translate></Label>
                <AvInput type="date" className="form-control" value={compromisso.start} name="start" />
              </AvGroup>
            </ModalBody>
            <ModalFooter>
              <Button/>
            </ModalFooter>
          </AvForm>})
      </Modal>
    );
  }

}
