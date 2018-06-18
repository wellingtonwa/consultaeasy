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
  updateCompromisso,
  addCompromisso
} from '../../../reducers/compromisso-management';
import {
  closeEditDialog,
  changeDefaultView,
  eventClick,
  changeDate
} from '../../../reducers/agenda-management'
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
    addCompromisso: any;
    eventClick: any;
    closeEditDialog: any;
    changeDefaultView: any;
    changeDate: any;
    compromissos: any[];
    marcadores: any[];
    compromisso: any;
    match: any;
    loading: boolean;
    updating: boolean;
    header: any;
    showEditDialog: boolean;
    isNew: boolean;
    defaultView: string;
    history:any;
}

export const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';

export class Agenda extends React.Component<IAgendaProps> {

    agenda;

    componentDidMount() {
        this.props.getCompromissos();
        this.props.getMarcadores();
        this.checkUrl();
    }

    checkUrl = () => {
      const { match } = this.props;
      if(match.url.indexOf("edit")>=0 && match.params.id){
        this.props.getCompromisso(match.params.id);
        this.props.eventClick(false);
      }
    };

    handleOnDayClick = (...data) => {
        this.props.addCompromisso(data[0].date.format(FORMAT_EVENT_DATETIME));
        this.props.eventClick(true);
    };

    addCompromisso = () => {
        this.props.addCompromisso();
        this.props.eventClick(true);
    };

    handleOnEventClick = (...data) => {
        const compromisso = data[0].calEvent;
        this.props.getCompromisso(compromisso.id);
        this.props.eventClick(false);
        this.props.history.push(`/cadastro/agenda/${compromisso.id}/edit/`);
    };

    handleCloseModal = () => {
        this.props.closeEditDialog();
        this.props.history.push(`/cadastro/agenda`);
    };

    saveCompromisso = (event, errors, values) => {
        if (errors.length === 0) {
            values.id ? this.props._updateCompromisso(values) : this.props.createCompromisso(values);
            this.handleCloseModal();
            if(!this.props.isNew) {
              const marcador = this.props.marcadores.filter(marc => marc.id === values.marcador)[0];
              let compromissoDaAgenda = this.agenda.schedule.fullCalendar('clientEvents', this.props.compromisso.id)[0];
              Object.assign(compromissoDaAgenda, values);

              compromissoDaAgenda.backgroundColor = '#'+marcador.cor;
              this.agenda.schedule.fullCalendar('updateEvent', compromissoDaAgenda);
            }
        }
    };

    ajustarInicioFimEvento = (delta, event) => {
        const evento = _.cloneDeep(event);
        let compromisso = evento;
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
      this.agenda.schedule.fullCalendar('updateEvent', compromisso[1]);
      // this.props.getCompromissos();
    };

    handleEventResizeStop = (...data) => {
        this.handleEventDrop(data[0]);
    };

    deleteFunction = () => {

    };

    showAgendaWeek = () => {
      this.props.changeDefaultView('agendaWeek');
      this.agenda.schedule.fullCalendar('changeView', 'agendaWeek');
    };

    showAgendaMonth = () => {
      this.props.changeDefaultView('month');
      this.agenda.schedule.fullCalendar('changeView', 'month');
    };

    next = () => {
      this.agenda.schedule.fullCalendar('next');
      const data = this.agenda.schedule.fullCalendar('getDate');
      this.props.changeDate(data.format(), null);
    };

    prev = () => {
      this.agenda.schedule.fullCalendar('prev');
      const data = this.agenda.schedule.fullCalendar('getDate');
      this.props.changeDate(data.format(), null);
    };

    render() {
        const { compromissos, loading, updating, marcadores, header, showEditDialog, compromisso, isNew, defaultView } = this.props;
        return(
            <div>
              <div style={{float:'left', display: 'in-line'}}>
                <Button onClick={this.addCompromisso}>
                    Adicionar Compromisso
                </Button>
                <Button onClick={this.prev}>
                    Anterior
                </Button>
                <Button onClick={this.next}>
                    Próximo
                </Button>
              </div>
              <div style={{float:'right', display: 'in-line'}}>
                <Button onClick={this.showAgendaMonth}>
                  Mês
                </Button>
                <Button onClick={this.showAgendaWeek}>
                  Semana
                </Button>
              </div>
              <div style={{clear: 'both'}}>
                </div>
                <Schedule header={header} events={compromissos} onDayClick={this.handleOnDayClick} defaultView={defaultView}
                onEventClick={this.handleOnEventClick} onEventDrop={this.handleEventDrop}
                onEventResize={this.handleEventResizeStop} ref={input => this.agenda = input}/>
                <AgendaAddCompromisso showModal={showEditDialog} handleCloseFunction={this.handleCloseModal}
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
    updating: storeState.compromissoManagement.updating,
    showEditDialog: storeState.agendaManagement.showEditDialog,
    headerConfig: storeState.agendaManagement.header,
    defaultView: storeState.agendaManagement.defaultView,
    startDate: storeState.agendaManagement.startDate,
    endDate: storeState.agendaManagement.endDate,
    header: storeState.agendaManagement.header,
    isNew: storeState.agendaManagement.isNew
});

const mapDispatchToProps = {
  getCompromissos, getCompromisso, createCompromisso, _updateCompromisso, getMarcadores,
  updateCompromisso,  closeEditDialog, changeDefaultView, eventClick, addCompromisso,
  changeDate
};

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
