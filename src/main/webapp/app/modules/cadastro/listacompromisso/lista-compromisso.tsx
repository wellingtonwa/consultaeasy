import {ICrudGetAction, ICrudPutAction, Translate} from 'react-jhipster';
import * as React from 'react';
import { connect } from 'react-redux';
import { changeDate, changeDataTermino, showCompromissoDialog, setIsNew, openDeleteDialog, closeDeleteDialog } from "../../../reducers/lista-compromisso-management";
import { getPacientes } from "../../../reducers/paciente-management";
import { getMarcadores } from "../../../reducers/marcador-management";
import { addCompromisso, updateCompromisso, createCompromisso, getCompromissosByData, getCompromissosByDataInicioTermino, getCompromisso, deleteCompromisso } from "../../../reducers/compromisso-management";
import { Calendar } from "primereact/components/calendar/Calendar";
import { Button } from "primereact/components/button/Button";
import { AgendaAddCompromisso } from "../agenda/agenda-add-compromisso";
import moment from 'moment/src/moment';
import { ptBR } from "../../../shared/layout/location/location";
import {AgendaDelCompromisso} from "../agenda/agenda-del-compromisso";

export interface IListaCompromissoProps {
  createCompromisso: ICrudPutAction;
  updateCompromisso: ICrudPutAction;
  deleteCompromisso: ICrudPutAction;
  getCompromisso: ICrudGetAction;
  getCompromissosByData: ICrudGetAction;
  getCompromissosByDataInicioTermino: ICrudGetAction;
  getPacientes: ICrudGetAction;
  getMarcadores: ICrudGetAction;
  changeDate: any;
  changeDataTermino: any;
  setIsNew: any;
  addCompromisso: any;
  showCompromissoDialog: any;
  pacientes: any[];
  marcadores: any[];
  compromissos: any[];
  compromisso: any;
  loading: boolean;
  isNew: boolean;
  showDeleteDialog: boolean;
  openDeleteDialog: any;
  closeDeleteDialog: any;
  addCompromissoDlg: boolean;
  data: any;
  dataTermino: any;
  match: any;
  history: any;
}

const BASE_URL = "/cadastro/lista-compromisso";


export const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';
export const VIEW_EVENT_DATETIME = 'DD-MM-YYYY HH:mm';

export class ListaCompromisso extends React.Component<IListaCompromissoProps>{


  componentDidMount() {
    this.props.getPacientes();
    this.props.getMarcadores();
    this.checkUrl();
    this.props.getCompromissosByDataInicioTermino(null, null, null, this.props.data, this.props.dataTermino);
  };

  checkUrl = () => {
    const { match } = this.props;
    if (match.url.indexOf('edit') >= 0 && match.params.id) {
      this.props.getCompromisso(match.params.id);
      this.props.setIsNew(false);
      this.props.showCompromissoDialog(true);
    }
    if (match.url.indexOf('delete') >= 0 && match.params.id) {
      this.props.getCompromisso(match.params.id);
      this.props.openDeleteDialog();
    }
    if (match.url.indexOf('new') >= 0 && match.params.id) {
      this.props.addCompromisso(moment().format(FORMAT_EVENT_DATETIME));
      this.props.setIsNew(true);
      this.props.showCompromissoDialog(true);
    }
  }

  changeDate = e => {
    this.props.changeDate(e.value);
    this.props.getCompromissosByDataInicioTermino(null, null, null, e.value, this.props.dataTermino);
  };

  changeDataTermino = e => {
    this.props.changeDataTermino(e.value);
    this.props.getCompromissosByDataInicioTermino(null, null, null, this.props.data, e.value);
  }

  openCompromissoDialog = () => {
    this.props.addCompromisso(moment().format(FORMAT_EVENT_DATETIME));
    this.props.setIsNew(true);
    this.props.showCompromissoDialog(true);
    this.props.history.push(`${BASE_URL}/0/new`);
  };

  openEditDialog = ( idCompromisso , event) => {
    this.props.getCompromisso(idCompromisso);
    this.props.setIsNew(false);
    this.props.showCompromissoDialog(true);
    this.props.history.push(`${BASE_URL}/${idCompromisso}/edit`);
  }

  closeCompromissoDialog = () => {
    this.props.showCompromissoDialog(false);
    this.props.history.push(BASE_URL);
  };

  closeHandleDeleteDialog = () => {
    this.props.closeDeleteDialog();
    this.props.history.push(BASE_URL);
  }

  confirmedDelete = () => {
    this.props.deleteCompromisso(this.props.compromisso.id, this.props.data);
    this.props.closeDeleteDialog();
    this.props.history.push(BASE_URL);
  }

  openDeleteDialog = (comp, e) => {
    this.props.getCompromisso(comp.id);
    this.props.history.push(`${BASE_URL}/${comp.id}/delete`);
    this.props.showCompromissoDialog(false);
    this.props.openDeleteDialog();
  }

  saveCompromisso = (event, errors, values) => {
    if (errors.length === 0) {
      values.id ? this.props.updateCompromisso(values, this.props.data) : this.props.createCompromisso(values, this.props.data);
      this.closeCompromissoDialog();
    }
  };

  carregarLista = compromissos => {
    if(compromissos && compromissos.length > 0) {
      return <div className={ 'ui-g' }> { compromissos.map(compromissoAgenda => {
        var cor = compromissoAgenda.marcador ? `#${compromissoAgenda.marcador.cor}` : '#FFFFFF';
        return <div key={compromissoAgenda.id} className={'ui-lg-4 ui-md-6 ui-g-12 card'} style={{margin: 5}}>
          <div className={'card-body'}>
            {compromissoAgenda.marcador ? <div style={ {height: 20, width: '100%', backgroundColor: cor} }>&nbsp;</div> : null}
            <h5 className={'card-title'}>Títulos: {compromissoAgenda.title}</h5>
            <div>Descrição: {compromissoAgenda.descricao}</div>
            <div>Início: {moment(compromissoAgenda.start).format(VIEW_EVENT_DATETIME)}</div>
            {compromissoAgenda.end ? <div>
              Término: {moment(compromissoAgenda.end).format(VIEW_EVENT_DATETIME)}
            </div> : null}
            {compromissoAgenda.marcador ? <div>
                <div style={ {float: 'left'} }>Marcador: {compromissoAgenda.marcador.nome}</div>
                <div style={ { clear: 'both' } } ></div>
              </div> : null}
            {compromissoAgenda.paciente ? <div>Paciente: {compromissoAgenda.paciente.nomeCompleto}</div> : null}
            <Button label={'Editar'} icon={'pi pi-pencil'} onClick={this.openEditDialog.bind(event, compromissoAgenda.id)}/>
            <Button label={'Excluir'} icon={'pi pi-trash'} className={'ui-button-warning'} onClick={this.openDeleteDialog.bind(this, compromissoAgenda)}/>
          </div>
        </div>
      })}
      </div>
    } else {
      return <div>Nenhum compromisso encontrado</div>
    }
  };


  render() {
    const { data, compromissos, loading, addCompromissoDlg, compromisso
      , pacientes, isNew, marcadores, showDeleteDialog, dataTermino } = this.props;

    return (
      <div>
        <div className={ 'card' }>
          <div className={ 'card-body ui-g-nopad' } style={ { marginBottom:10} }>
            <div className={ 'ui-g-12 ui-md-6 ui-lg-4'}>
              Data inicio: <Calendar locale={ ptBR } value={ data } dateFormat={'dd/mm/yy'} onChange={(e) => this.changeDate(e)}/>
            </div>
            <div className={ 'ui-g-12 ui-md-6 ui-lg-4'}>
              Data término: <Calendar locale={ ptBR } value={ dataTermino } dateFormat={'dd/mm/yy'} onChange={(e) => this.changeDataTermino(e)}/>
            </div>
            <div className={ 'ui-g-12 ui-md-6 ui-lg-4'} >
              <Button label={ 'Compromisso' } icon={ 'pi pi-plus' } onClick={ this.openCompromissoDialog }/>
            </div>
          </div>
        </div>
        {loading ? <div>Carregando</div> :
         <div>
           {this.carregarLista(compromissos)}
         </div>}
         <AgendaAddCompromisso showModal={ addCompromissoDlg } handleCloseFunction={ this.closeCompromissoDialog } compromisso={ compromisso } pacientes={ pacientes }
                               handleSaveCompromisso={ this.saveCompromisso } isNew={ isNew } marcadores={ marcadores } handleDeleteFunction={this.openDeleteDialog}/>
        <AgendaDelCompromisso showModal={ showDeleteDialog } handleCloseFunction={this.closeHandleDeleteDialog} confirmedDeleteFunction={this.confirmedDelete}
          compromisso={ compromisso } loading = {loading}/>
      </div>
    );
  }

}

const mapStateToProps =  storeState => ({
  compromissos: storeState.compromissoManagement.compromissos,
  compromisso: storeState.compromissoManagement.compromisso,
  addCompromissoDlg: storeState.listaCompromissoManagement.showAddCompromissoDialog,
  pacientes: storeState.pacienteManagement.pacientes,
  marcadores: storeState.marcadorManagement.marcadores,
  data: storeState.listaCompromissoManagement.data,
  dataTermino: storeState.listaCompromissoManagement.dataTermino,
  isNew: storeState.listaCompromissoManagement.isNew,
  showDeleteDialog: storeState.listaCompromissoManagement.showDeleteDialog,
  loading: storeState.compromissoManagement.loading
});

const mapDispatchToProps = {
  getCompromissosByData,
  getCompromissosByDataInicioTermino,
  getCompromisso,
  updateCompromisso,
  createCompromisso,
  deleteCompromisso,
  getMarcadores,
  getPacientes,
  setIsNew,
  showCompromissoDialog,
  addCompromisso,
  changeDate,
  changeDataTermino,
  openDeleteDialog,
  closeDeleteDialog
};

export default connect(mapStateToProps, mapDispatchToProps) (ListaCompromisso);
