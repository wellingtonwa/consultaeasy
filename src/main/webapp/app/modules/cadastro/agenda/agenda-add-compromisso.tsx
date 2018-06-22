import * as React from 'react';
import { Translate } from 'react-jhipster';
import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
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

  pacientesDropDown = () => {
    const { pacientes, loadingPacientes } = this.props;
    console.log(">>>>>", pacientes, loadingPacientes);
    if (loadingPacientes || !pacientes) {
      return <div>Carregando...</div>;
    }
    return <AvGroup>
      <Label for="paciente">Paciente</Label>
      <Input type="select" name="paciente">
        <option key="paciente0">Selecione um paciente</option>
      {pacientes.map(e => <option key={e.id}>{e.nomeCompleto}</option>)}
      </Input>
    </AvGroup>;
  }

  render() {
    const { loading, isNew, showModal, handleCloseFunction,
            handleSaveCompromisso, marcadores, handleDeleteFunction} = this.props;
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
                  <AvInput type="text" className="form-control" name="id" value={compromisso.id ? compromisso.id : ''} required readOnly />
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
              {this.pacientesDropDown()}
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
              <Button color="primary" type="submit">
                Salvar
              </Button>
              <Button color="secondary" onClick={handleCloseFunction}>
                Cancelar
              </Button>
              {handleDeleteFunction && !isNew ?
                        <Button color="warning" onClick={handleDeleteFunction.bind(this, compromisso)}>
                          Excluir
                        </Button> : null
              }
            </ModalFooter>
          </AvForm>}
      </Modal>
    );
  }

}
