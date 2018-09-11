import * as React from 'react';
import { Translate } from 'react-jhipster';
import { AvForm, AvInput, AvGroup, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import SelectMarcadorCompromisso from './partial/select-marcador';
import {Calendar} from "primereact/components/calendar/Calendar";
import {ptBR} from "../../../shared/layout/location/location";
import {InputText} from "primereact/components/inputtext/InputText";

export class AgendaAddCompromisso extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { compromisso: props.compromisso, id:undefined, title:undefined, start: undefined, end: undefined };
  }

  prepareToSave = () => {
    this.props.handleSaveCompromisso(null, [], this.state.compromisso);
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

  onChangeAttr = (event, attr) => {
    const { compromisso } = this.state;
    compromisso[attr] = event.target.value;
    this.setState({ compromisso });
  }

  pacientesDropDown = () => {
    const { pacientes, loadingPacientes } = this.props;
    if (loadingPacientes || !pacientes) {
      return <div>Carregando...</div>;
    }
    return <AvGroup>
      <Label for="paciente">Paciente</Label>
      <AvField type="select" name="paciente">
        <option key="paciente0" value="0">Selecione um paciente</option>
      {pacientes.map(e => <option key={e.id} value={e.id}>{e.nomeCompleto}</option>)}
      </AvField>
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
          : <AvForm model={isNew ? {} : compromisso} onSubmit={this.prepareToSave}>
            <ModalBody>
              <div className={ 'pui-fluid' }>
              {!isNew
                ? <div className={ 'ui-g-12 ui-g-nopad' }>
                    <div className={ 'ui-g-12 ui-g-nopad' }><Translate contentKey="global.field.id">ID</Translate></div>
                    <div className={ 'ui-g-12 ui-g-nopad' }><InputText className={ 'ui-g-12' } name="id" value={compromisso.id ? compromisso.id : ''} onChange={this.onChangeAttr.bind("id", event)}/></div>
                  </div>
                : null
              }
                <div className={ 'ui-g-12 ui-g-nopad' }><Translate contentKey="compromissoManagement.titulo">Título</Translate></div>
                <div className={ 'ui-g-12 ui-g-nopad' }><InputText name="title" className={'ui-g-12'} value={compromisso.title ? compromisso.title : ''}  onChange={(event) => this.onChangeAttr(event, "title")} /></div>

                <div className={ 'ui-g-12 ui-g-nopad' }><Translate contentKey="compromissoManagement.descricao">Descricao</Translate></div>
                <div className={ 'ui-g-12 ui-g-nopad' }><InputText className={ 'ui-g-12' } name="descricao" value={compromisso.descricao ? compromisso.descricao : ''} onChange={(event) => this.onChangeAttr(event, "descricao")}/></div>
              {this.pacientesDropDown()}
                <div className={ 'ui-g-12 ui-g-nopad' }><Translate contentKey="compromissoManagement.dataInicio">First Name</Translate></div>
                <div className={ 'ui-g-12 ui-g-nopad' }><AvInput type="datetime-local" className="form-control" value={compromisso.start ? compromisso.start : ''} name="start"  onChange={(event) => this.onChangeAttr(event, "start")} /></div>

                <div className={ 'ui-g-12 ui-g-nopad' }><Translate contentKey="compromissoManagement.dataTermino">First Name</Translate></div>
                <div className={ 'ui-g-12 ui-g-nopad' }><AvInput type="datetime-local" className="form-control" value={compromisso.end ? compromisso.end : ''} name="end"  onChange={(event) => this.onChangeAttr(event, "end")} /></div>
                {/*<AvInput type="datetime-local" className="form-control" value={compromisso.end ? compromisso.end : ''} name="end" />*/}
              <AvGroup>
                <Label for="marcador"><Translate contentKey="compromissoManagement.marcador">First Name</Translate></Label>
                <AvInput type="hidden" name="marcador" value={compromisso.marcador}/><br/>
                <SelectMarcadorCompromisso panelClassName="form-control" marcadores={marcadores} compromisso={compromisso} onChange={this.onChangeMarcador}/>
              </AvGroup>
              </div>
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
