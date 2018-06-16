import * as React from 'react';
import {connect} from 'react-redux';
import {Schedule} from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import * as _ from 'lodash';
import {ICrudGetAction, ICrudPutAction, Translate} from 'react-jhipster';
import {
  _updateCompromisso,
  createCompromisso,
  getCompromisso,
  getCompromissos,
  updateCompromisso
} from '../../../reducers/compromisso-management';
import {getMarcadores} from '../../../reducers/marcador-management';
import {AgendaAddCompromisso} from './agenda-add-compromisso';
import {Button} from 'reactstrap';
import 'fullcalendar/dist/locale/pt-br.js';

export interface IAgendaProps {
    getCompromissos: ICrudGetAction;
    getMarcadores: ICrudGetAction;
    getCompromisso: ICrudGetAction;
    createCompromisso: ICrudPutAction;
    _updateCompromisso: ICrudPutAction;
    updateCompromisso: ICrudPutAction;
    compromissos: any[];
    marcadores: any[];
    compromisso: any;
    match: any;
    loading: boolean;
    updating: boolean;
}

export interface IAgendaState {
    showCadastroCompromisso: boolean;
    compromisso: any;
    isNew: boolean;
}

export const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';

const header = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
};

export class Agenda extends React.Component<IAgendaProps, IAgendaState> {

    agenda;

    constructor(props) {
        super(props);
        this.state = {
            showCadastroCompromisso: false,
            compromisso: { start: '' },
            isNew: true
        };
    }

    componentDidMount() {
        this.props.getCompromissos();
        this.props.getMarcadores();
        console.log("Did mount");
        this.checkUrl();
    }

    checkUrl = () => {
      if(this.props.match.url.indexOf("edit")>=0 && this.props.match.params.id){
        this.props.getCompromisso(this.props.match.params.id);
        console.log("chackUrl Edit");
      }
    };

    componentDidUpdate(prevProps, prevState, snapsho){
      if(this.props.match.url.indexOf("edit")>=0 && this.props.match.params.id) {
        if(this.props.compromisso && this.props.compromisso.id == this.props.match.params.id
         && this.state.compromisso.id != this.props.compromisso.id){
          this.setState({ compromisso: this.props.compromisso, isNew: false });
          this.handleOpenModal();
        }
      }
    }

    handleOnDayClick = (...data) => {
        const compromisso = { start: '' };
        compromisso.start = data[0].date.format(FORMAT_EVENT_DATETIME);
        this.setState({ compromisso, isNew: true });
        this.handleOpenModal();
    };

    addCompromisso = () => {
        const compromisso = { start: '' };
        this.setState({ compromisso, isNew: true });
        this.handleOpenModal();
    };

    handleOnEventClick = (...data) => {
        const compromisso = data[0].calEvent;
        compromisso.start = compromisso.start.format(FORMAT_EVENT_DATETIME);
        compromisso.end = compromisso.end ? compromisso.end.format(FORMAT_EVENT_DATETIME) : null;
        this.setState({ compromisso, isNew: false });
        this.handleOpenModal();
    };

    handleOpenModal = () => {
        this.setState({ showCadastroCompromisso: true });
    };

    handleCloseModal = () => {
        this.setState({ showCadastroCompromisso: false });
    };

    saveCompromisso = (event, errors, values) => {
        if (errors.length === 0) {
            values.id ? this.props._updateCompromisso(values) : this.props.createCompromisso(values);
            this.handleCloseModal();
            if(!this.state.isNew) {

              const marcador = this.props.marcadores.filter(marc => marc.id === values.marcador)[0];
              let compromissoDaAgenda = this.agenda.schedule.fullCalendar('clientEvents', this.state.compromisso.id)[0];
              Object.assign(compromissoDaAgenda, values);

              compromissoDaAgenda.backgroundColor = '#'+marcador.cor;
              console.log(compromissoDaAgenda, marcador);
              this.agenda.schedule.fullCalendar('updateEvent', compromissoDaAgenda)
            }
        }
        this.props.getCompromissos();
    };

    ajustarInicioFimEvento = (delta, event) => {
        let compromisso = event;
        const evento = _.cloneDeep(event);
        evento.start.add(delta.days, 'days');
        evento.start.add(delta.months, 'months');
        evento.start.add(delta.hours, 'hours');
        evento.start.add(delta.minutes, 'minutes');
        compromisso.start = evento.start.format(FORMAT_EVENT_DATETIME);
        if (compromisso.end) {
          evento.end.add(delta.days, 'days');
          evento.end.add(delta.months, 'months');
          evento.end.add(delta.hours, 'hours');
          evento.end.add(delta.minutes, 'minutes');
          compromisso.end = evento.end.format(FORMAT_EVENT_DATETIME);
        }
        compromisso = { id: compromisso.id, title: compromisso.title, descricao: compromisso.descricao, start: compromisso.start,
                        end: compromisso.end, marcador: compromisso.marcador, user: compromisso.user, paciente: compromisso.paciente};
        return [ compromisso, event ];
    };

    handleEventDrop = (...data) => {
        const compromisso = this.ajustarInicioFimEvento(data[0].delta, data[0].event);
        // const compromisso = { title: ac.title, descricao: ac.descricao, start: ac.start, end: ac.end };
        this.props._updateCompromisso(compromisso[0]);
        // this.agenda.schedule.fullCalendar('updateEvent', compromisso[1]);
    };

    handleEventResizeStop = (...data) => {
        this.handleEventDrop(data[0]);
    };

    deleteFunction = () => {

    };

    testeAtualizacao = () => {
      let compromisso = this.state.compromisso;
      compromisso.title = 'Testando';
      this.agenda.schedule.fullCalendar("updateEvent", this.state.compromisso);
    };

    render() {
        const { compromissos, loading, updating, marcadores } = this.props;
        const { showCadastroCompromisso, compromisso, isNew } = this.state;
        return(
            <div>
                <Button onClick={this.addCompromisso}>
                    Adicionar Compromisso
                </Button>
                <Button onClick={this.testeAtualizacao}>
                    Teste atualização
                </Button>
                <Schedule header={header} events={compromissos} onDayClick={this.handleOnDayClick}
                onEventClick={this.handleOnEventClick} onEventDrop={this.handleEventDrop}
                onEventResize={this.handleEventResizeStop} ref={input => this.agenda = input}/>
                <AgendaAddCompromisso showModal={showCadastroCompromisso} handleCloseFunction={this.handleCloseModal}
                compromisso={compromisso} loading={loading} updating={updating} handleSaveCompromisso={this.saveCompromisso}
                marcadores={marcadores} handleDeleteFunction={this.deleteFunction}
                isNew={isNew}/>
            </div>
        );
    }

}

const mapStateToProps = storeState => ({
    compromissos: storeState.compromissoManagement.compromissos,
    compromisso: storeState.compromissoManagement.compromisso,
    marcadores: storeState.marcadorManagement.marcadores,
    loading: storeState.compromissoManagement.loading,
    updating: storeState.compromissoManagement.updating
});

const mapDispatchToProps = { getCompromissos, getCompromisso, createCompromisso, _updateCompromisso, getMarcadores, updateCompromisso };

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
