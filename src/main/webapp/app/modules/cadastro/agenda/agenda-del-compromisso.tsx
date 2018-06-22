import * as React from 'react';
import { Translate } from 'react-jhipster';
import { AvForm } from 'availity-reactstrap-validation';
import { Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export class AgendaDelCompromisso extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    const { loading, showModal, handleCloseFunction,
            confirmedDeleteFunction, compromisso } = this.props;
    return (
      <Modal isOpen={showModal} size="lg" toggle={handleCloseFunction}
        modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}>
        <ModalHeader toggle={handleCloseFunction}>
          <Translate contentKey="compromissoManagement.home.createOrEditLabel">
            Create or edit a Compromisso
          </Translate>
        </ModalHeader>
        {loading ? <span>carregando...</span>
          : <AvForm>
            <ModalBody>
              Deseja realmente remover o compromisso '<b>{compromisso.title}</b>'?
            </ModalBody>
            <ModalFooter>
              {confirmedDeleteFunction ?
                <Button color="danger" onClick={confirmedDeleteFunction}>
                  Sim
                </Button> : null
              }
              <Button color="secondary" onClick={handleCloseFunction}>
                Não
              </Button>
            </ModalFooter>
          </AvForm>}
      </Modal>
    );
  }

}
