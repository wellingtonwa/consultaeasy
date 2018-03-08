import * as React from 'react';
import { Translate } from 'react-jhipster';
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getCompromisso, updateCompromisso, createCompromisso } from '../../../reducers/compromisso-management';
import SelectMarcadorCompromisso from './partial/select-marcador';


export class AgendaAddCompromisso extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { compromisso: props.compromisso };
  }

  componentWillReceiveProps(next) {
    const { compromisso } = next;
    this.setState({ compromisso });
  }

  onChangeMarcador = event => {
    const { compromisso } = this.state;
    compromisso.marcador = event.value;
    this.setState({ compromisso });
  }

  render() {
    const { loading, isNew, showModal, handleCloseFunction,
            handleSaveCompromisso, marcadores } = this.props;
    const { compromisso } = this.state;
    return (
      <Modal isOpen={showModal} size="lg" toggle={handleCloseFunction}
        modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}>
        <ModalHeader toggle={handleCloseFunction}>
          <Translate contentKey="compromissoManagement.home.createOrEditLabel">
            Create or edit a Compromisso
          </Translate>
        </ModalHeader>
        {loading ? <span>carregando...</span>
          : <AvForm model={isNew ? {} : compromisso} onSubmit={handleSaveCompromisso}>
            <ModalBody>
              {!isNew
                ? <AvGroup>
                  <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                  <AvInput type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
                : null
              }
              <AvGroup>
                <Label for="title"><Translate contentKey="compromissoManagement.titulo">Título</Translate></Label>
                <AvInput name="title" className="form-control" value={compromisso.title ? compromisso.title : ''} autoFocus required />
                <AvFeedback>Este campo é obrigatório</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="descricao"><Translate contentKey="compromissoManagement.descricao">Descricao</Translate></Label>
                <AvInput name="descricao" className="form-control" value={compromisso.descricao ? compromisso.descricao : ''} />
              </AvGroup>
              <AvGroup>
                <Label for="start"><Translate contentKey="compromissoManagement.dataInicio">First Name</Translate></Label>
                <AvInput type="datetime-local" className="form-control" value={compromisso.start ? compromisso.start : ''} name="start" required />
                <AvFeedback>Este campo é obrigatório</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="end"><Translate contentKey="compromissoManagement.dataTermino">First Name</Translate></Label>
                <AvInput type="datetime-local" className="form-control" value={compromisso.end ? compromisso.end : ''} name="end" />
              </AvGroup>
              <AvGroup>
                <Label for="marcador"><Translate contentKey="compromissoManagement.marcador">First Name</Translate></Label>
                <AvInput type="hidden" name="marcador" value={compromisso.marcador}/><br/>
                <SelectMarcadorCompromisso panelClassName="form-control" marcadores={marcadores} compromisso={compromisso} onChange={this.onChangeMarcador}/>
              </AvGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="button" onClick={handleCloseFunction}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar
              </Button>
            </ModalFooter>
          </AvForm>}
      </Modal>
    );
  }

}
