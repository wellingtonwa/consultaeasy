import {ICrudGetAction, ICrudPutAction, Translate} from 'react-jhipster';
import * as React from 'react';
import { connect } from 'react-redux';
import { changeDate, showCompromissoDialog, setIsNew } from "../../../reducers/lista-compromisso-management";
import { getPacientes } from "../../../reducers/paciente-management";
import { getMarcadores } from "../../../reducers/marcador-management";
import { addCompromisso, updateCompromisso, createCompromisso, getCompromissosByData } from "../../../reducers/compromisso-management";
import { Calendar } from "primereact/components/calendar/Calendar";
import { Button } from "primereact/components/button/Button";
import { AgendaAddCompromisso } from "../agenda/agenda-add-compromisso";
import moment from 'moment/src/moment';

export interface IListaCompromissoProps {
  createCompromisso: ICrudPutAction;
  updateCompromisso: ICrudPutAction;
  getCompromissosByData: ICrudGetAction;
  getPacientes: ICrudGetAction;
  getMarcadores: ICrudGetAction;
  changeDate: any;
  setIsNew: any;
  addCompromisso: any;
  showCompromissoDialog: any;
  pacientes: any[];
  marcadores: any[];
  compromissos: any[];
  compromisso: any;
  loading: boolean;
  isNew: boolean;
  addCompromissoDlg: boolean;
  data: any;
}

export const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';

export class ListaCompromisso extends React.Component<IListaCompromissoProps>{


  componentDidMount() {
    this.props.getPacientes();
    this.props.getMarcadores();
    this.props.getCompromissosByData(null, null, null, this.props.data);
  };

  changeDate = e => {
    this.props.changeDate(e.value);
    this.props.getCompromissosByData(null, null, null, e.value);
  };

  openCompromissoDialog = () => {
    this.props.addCompromisso(moment().format(FORMAT_EVENT_DATETIME));
    this.props.setIsNew(true);
    this.props.showCompromissoDialog(true);
  };

  closeCompromissoDialog = () => {
    this.props.showCompromissoDialog(false);
  };

  saveCompromisso = (event, errors, values) => {
    if (errors.length === 0) {
      values.id ? this.props.updateCompromisso(values) : this.props.createCompromisso(values, this.props.data);
      this.closeCompromissoDialog();
      this.props.getCompromissosByData(null,null,null,this.props.data);
    }
  };

  carregarLista = compromissos => {
    if(compromissos && compromissos.length > 0) {
      return <div className={ 'ui-g' }> { compromissos.map(compromissoAgenda =>
        <div key={ compromissoAgenda.id } className={ 'ui-lg-3 ui-md-6 ui-g-12 card' } style={ {margin: 5} }>
          <div className={ 'card-body' }>
            <h5 className={ 'card-title' }>Título: { compromissoAgenda.title }</h5>
            <div>Descrição: { compromissoAgenda.descricao }</div>
            <div>Início: { compromissoAgenda.start }</div>
            {compromissoAgenda.marcador ? <div style={ { color: `#${ compromissoAgenda.marcador.cor }` } }>Marcador: { compromissoAgenda.marcador.nome }</div> : null }
            {compromissoAgenda.paciente ? <div>Paciente: { compromissoAgenda.paciente.nomeCompleto }</div> : null }
          </div>
        </div>
        )}
      </div>
    } else {

      return <div>Nenhum compromisso encontrado</div>
    }
  };


  render() {
    const { data, compromissos, loading, addCompromissoDlg, compromisso, pacientes, isNew } = this.props;
    return (
      <div>
        <div className={ 'card' }>
          <div className={ 'card-body ui-g-nopad' } style={ { marginBottom:10} }>
            <div className={ 'ui-g-12 ui-md-6 ui-lg-3'}>
              Data Atual: <Calendar value={ data } dateFormat={'dd/mm/yy'} onChange={(e) => this.changeDate(e)}/>
            </div>
            <div className={ 'ui-g-12 ui-md-6 ui-lg-3'} >
              <Button label={ 'Compromisso' } icon={ 'pi pi-plus' } onClick={ this.openCompromissoDialog }/>
            </div>
          </div>
        </div>
        {loading ? <div>Carregando</div> :
         <div>
           {this.carregarLista(compromissos)}
         </div>}
         <AgendaAddCompromisso showModal={ addCompromissoDlg } handleCloseFunction={ this.closeCompromissoDialog } compromisso={ compromisso } pacientes={ pacientes }
                               handleSaveCompromisso={ this.saveCompromisso } isNew={ isNew }/>
      </div>
    );
  }

}

const mapStateToProps =  storeState => ({
  compromissos: storeState.compromissoManagement.compromissos,
  compromisso: storeState.compromissoManagement.compromisso,
  addCompromissoDlg: storeState.listaCompromissoManagement.showAddCompromissoDialog,
  pacientes: storeState.pacienteManagement.pacientes,
  marcadores: storeState.pacienteManagement.marcadores,
  data: storeState.listaCompromissoManagement.data,
  isNew: storeState.listaCompromissoManagement.isNew,
  loading: storeState.compromissoManagement.loading
});

const mapDispatchToProps = {
  getCompromissosByData,
  updateCompromisso,
  createCompromisso,
  getMarcadores,
  getPacientes,
  setIsNew,
  showCompromissoDialog,
  addCompromisso,
  changeDate
};

export default connect(mapStateToProps, mapDispatchToProps) (ListaCompromisso);
