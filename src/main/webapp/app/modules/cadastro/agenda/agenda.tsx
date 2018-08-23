import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import * as _ from 'lodash';
import { ICrudGetAction, ICrudPutAction, Translate } from 'react-jhipster';
import {
  _updateCompromisso, createCompromisso, getCompromisso, getCompromissos,
  updateCompromisso, addCompromisso, _deleteCompromisso, setCompromisso
} from '../../../reducers/compromisso-management';
import {
  closeEditDialog, changeDefaultView, eventClick, changeDate,
  openDeleteDialog, closeDeleteDialog
} from '../../../reducers/agenda-management';
import { getPacientes } from '../../../reducers/paciente-management';
import { getMarcadores } from '../../../reducers/marcador-management';
import { AgendaAddCompromisso } from './agenda-add-compromisso';
import { AgendaDelCompromisso } from './agenda-del-compromisso';
import { Button } from 'reactstrap';
    import 'fullcalendar/dist/locale/pt-br.js';

export interface IAgendaProps {
    getCompromissos: ICrudGetAction;
    getMarcadores: ICrudGetAction;
    getCompromisso: ICrudGetAction;
    createCompromisso: ICrudPutAction;
    _updateCompromisso: ICrudPutAction;
    _deleteCompromisso: ICrudPutAction;
    getPacientes: ICrudGetAction;
    setCompromisso: any;
    closeEditDialog: any;
    openEditDialog: any;
    closeDeleteDialog: any;
    openDeleteDialog: any;
    addCompromisso: any;
    eventClick: any;
    changeDefaultView: any;
    changeDate: any;
    compromissos: any[];
    marcadores: any[];
    pacientes: any[];
    compromisso: any;
    match: any;
    loading: boolean;
    loadingPacientes: boolean;
    updating: boolean;
    header: any;
    showEditDialog: boolean;
    showDeleteDialog: boolean;
    isNew: boolean;
    defaultView: string;
    history: any;
}

export const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';

export class Agenda extends React.Component<IAgendaProps> {

    agenda;

    constructor(props) {
      super(props);
      this.props.getCompromissos();
      this.props.getMarcadores();
      this.props.getPacientes();
    }

    componentDidMount() {
        this.checkUrl();
    }

    checkUrl = () => {
      const { match } = this.props;
      if (match.url.indexOf('edit') >= 0 && match.params.id) {
        this.props.getCompromisso(match.params.id);
        this.props.eventClick(false);
      }
      if (match.url.indexOf('delete') >= 0 && match.params.id) {
        this.props.getCompromisso(match.params.id);
        this.props.openDeleteDialog();
      }
    }

    handleOnDayClick = (...data) => {
        this.props.addCompromisso(data[0].date.format(FORMAT_EVENT_DATETIME));
        this.props.eventClick(true);
    }

    addCompromisso = () => {
        this.props.addCompromisso();
        this.props.eventClick(true);
    }

    handleOnEventClick = (...data) => {
        const compromisso = data[0].calEvent;
        this.props.setCompromisso(compromisso);
        compromisso.start = compromisso.start ? compromisso.start.format(FORMAT_EVENT_DATETIME) : null;
        compromisso.end = compromisso.end ? compromisso.end.format(FORMAT_EVENT_DATETIME) : null;
        this.props.eventClick(false);
        this.props.history.push(`/cadastro/agenda/${compromisso.id}/edit/`);
    }

    handleCloseModal = () => {
        this.props.closeEditDialog();
        this.props.history.push(`/cadastro/agenda`);
    }

    saveCompromisso = (event, errors, values) => {
        if (errors.length === 0) {
            values.id ? this.props._updateCompromisso(values) : this.props.createCompromisso(values);
            this.handleCloseModal();
            if (!this.props.isNew) {
              const marcador = this.props.marcadores.filter(marc => marc.id === values.marcador)[0];
              const compromissoDaAgenda = this.agenda.schedule.fullCalendar('clientEvents', this.props.compromisso.id)[0];
              Object.assign(compromissoDaAgenda, values);
              compromissoDaAgenda.backgroundColor = '#' + marcador.cor;
              compromissoDaAgenda.paciente = values.paciente === "0" ? null : values.paciente;
              compromissoDaAgenda.title = values.title;
              this.agenda.schedule.fullCalendar('updateEvent', compromissoDaAgenda);
            }
        }
    }

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
    }

    handleEventDrop = (...data) => {
      const compromisso = this.ajustarInicioFimEvento(data[0].delta, data[0].event);
      this.agenda.schedule.fullCalendar('updateEvent', compromisso[1]);
      // const compromisso = { title: ac.title, descricao: ac.descricao, start: ac.start, end: ac.end };
      this.props._updateCompromisso(compromisso[0]);
      // this.props.getCompromissos();
    }

    handleEventResizeStop = (...data) => {
        this.handleEventDrop(data[0]);
    }

    openDeleteDialog = (comp, e) => {
      this.props.history.push(`/cadastro/agenda/${comp.id}/delete/`);
      this.props.closeEditDialog();
      this.props.openDeleteDialog();
    }

    closeDeleteDialog = () => {
      this.props.closeDeleteDialog();
      this.props.history.push(`/cadastro/agenda`);
    }

    deleteCompromisso = () => {
      this.props._deleteCompromisso(this.props.compromisso.id);
      this.props.closeDeleteDialog();
      this.agenda.schedule.fullCalendar('removeEvents', this.props.compromisso.id);
    }

    showAgendaWeek = () => {
      this.props.changeDefaultView('agendaWeek');
      this.agenda.schedule.fullCalendar('changeView', 'agendaWeek');
    }

    showAgendaMonth = () => {
      this.props.changeDefaultView('month');
      this.agenda.schedule.fullCalendar('changeView', 'month');
    }

    next = () => {
      this.agenda.schedule.fullCalendar('next');
      const data = this.agenda.schedule.fullCalendar('getDate');
      this.props.changeDate(data.format(), null);
    }

    prev = () => {
      this.agenda.schedule.fullCalendar('prev');
      const data = this.agenda.schedule.fullCalendar('getDate');
      this.props.changeDate(data.format(), null);
    }

    render() {
        const { compromissos, loading, updating, marcadores, header, showEditDialog, compromisso, isNew, defaultView,
                showDeleteDialog, pacientes, loadingPacientes} = this.props;
        if (loading) {
          return(
            <div>Carregando...</div>
          );
        }
        return(
            <div>
              <div style={{ float: 'left', display: 'in-line' }}>
                <Button color="primary" onClick={this.addCompromisso}>
                    Adicionar Compromisso
                </Button>
                <Button color="primary" onClick={this.prev}>
                    Anterior
                </Button>
                <Button color="primary" onClick={this.next}>
                    Próximo
                </Button>
              </div>
              <div style={{ float: 'right', display: 'in-line' }}>
                <Button color="primary" onClick={this.showAgendaMonth}>
                  Mês
                </Button>
                <Button color="primary" onClick={this.showAgendaWeek}>
                  Semana
                </Button>
              </div>
              <div style={{ clear: 'both' }}/>
              <Schedule events={compromissos} onDayClick={this.handleOnDayClick} defaultView={defaultView}
              onEventClick={this.handleOnEventClick} onEventDrop={this.handleEventDrop}
              onEventResize={this.handleEventResizeStop} ref={input => this.agenda = input}/>

              <AgendaAddCompromisso showModal={showEditDialog} handleCloseFunction={this.handleCloseModal}
                                    compromisso={compromisso} loading={loading} updating={updating} handleSaveCompromisso={this.saveCompromisso}
                                    marcadores={marcadores} handleDeleteFunction={this.openDeleteDialog} isNew={isNew} loadingPacientes={loadingPacientes}
                                    pacientes={pacientes}/>

              <AgendaDelCompromisso showModal={showDeleteDialog} handleCloseFunction={this.closeDeleteDialog}
                                    compromisso={compromisso} loading={loading} confirmedDeleteFunction={this.deleteCompromisso}/>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    compromissos: storeState.compromissoManagement.compromissos,
    compromisso: storeState.compromissoManagement.compromisso,
    marcadores: storeState.marcadorManagement.marcadores,
    pacientes: storeState.pacienteManagement.pacientes,
    loading: storeState.compromissoManagement.loading,
    loadingPacientes: storeState.pacienteManagement.loading,
    updating: storeState.compromissoManagement.updating,
    showEditDialog: storeState.agendaManagement.showEditDialog,
    showDeleteDialog: storeState.agendaManagement.showDeleteDialog,
    headerConfig: storeState.agendaManagement.header,
    defaultView: storeState.agendaManagement.defaultView,
    startDate: storeState.agendaManagement.startDate,
    endDate: storeState.agendaManagement.endDate,
    header: storeState.agendaManagement.header,
    isNew: storeState.agendaManagement.isNew
});

const mapDispatchToProps = {
  getCompromissos, getCompromisso, createCompromisso, _updateCompromisso, getMarcadores,
  updateCompromisso, _deleteCompromisso, closeEditDialog, changeDefaultView, eventClick, addCompromisso,
  changeDate, openDeleteDialog, closeDeleteDialog, getPacientes, setCompromisso
};

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
