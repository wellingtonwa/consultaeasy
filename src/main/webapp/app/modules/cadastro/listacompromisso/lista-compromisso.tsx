import {ICrudGetAction, ICrudPutAction, Translate} from 'react-jhipster';
import * as React from 'react';
import {connect} from 'react-redux';
import {changeDate, getCompromissos} from "../../../reducers/lista-compromisso-management";
import {Calendar} from "primereact/components/calendar/Calendar";

export interface IListaCompromissoProps {
  getCompromissos: ICrudGetAction;
  changeDate: any;
  compromissos: any[];
  loading: boolean;
  data: any;
}

export const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';

export class ListaCompromisso extends React.Component<IListaCompromissoProps>{


  componentDidMount() {
    this.props.getCompromissos(null, null, null, this.props.data);
  }

  changeDate = e => {
    this.props.changeDate(e.value);
    this.props.getCompromissos(null, null, null, e.value);
  }

  carregarLista = compromissos => {
    if(compromissos && compromissos.length > 0) {
      return <div className={'ui-g'}> {compromissos.map(compromisso =>
        <div key={compromisso.id} className={'ui-lg-3 ui-md-6 ui-g-12 card'} style={ {margin: 5} }>
          <div className={'card-body'}>
            <h5 className={'card-title'}>Título: {compromisso.title}</h5>
            <div>Descrição: {compromisso.descricao}</div>
            <div>Início: {compromisso.start}</div>
            {compromisso.marcador ? <div style={ { color: `#${compromisso.marcador.cor}` } }>Marcador: {compromisso.marcador.nome}</div> : null }
            {compromisso.paciente ? <div>Paciente: {compromisso.paciente.nomeCompleto}</div> : null }
          </div>
        </div>
        )}
      </div>
    } else {

      return <div>Nenhum compromisso encontrado</div>
    }
  }


  render() {
    const { data, compromissos, loading } = this.props;
    return (
      <div>
        <div style={ { marginBottom:10} }>Data Atual: <Calendar value={data} dateFormat={'dd/mm/yy'} onChange={(e) => this.changeDate(e)}/> </div>
        {loading ? <div>Carregando</div> : this.carregarLista(compromissos)}
      </div>
    );
  }

}

const mapStateToProps =  storeState => ({
  compromissos: storeState.listaCompromissoManagement.compromissos,
  data: storeState.listaCompromissoManagement.data,
  loading: storeState.listaCompromissoManagement.loading
});

const mapDispatchToProps = {
  getCompromissos,
  changeDate
};

export default connect(mapStateToProps, mapDispatchToProps) (ListaCompromisso);
