import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import update from 'immutability-helper';
import * as _ from 'lodash';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos, getCompromisso, createCompromisso, _updateCompromisso, updateCompromisso } from '../../../reducers/compromisso-management';
import { getMarcadores } from '../../../reducers/marcador-management';
import { AgendaAddCompromisso } from './agenda-add-compromisso';
import { Button } from 'reactstrap';
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
    }

    handleOnDayClick = (...data) => {
        const compromisso = { start: '' };
        compromisso.start = data[0].date.format(FORMAT_EVENT_DATETIME);
        this.setState({ compromisso, isNew: true });
        this.handleOpenModal();
    }

    addCompromisso = () => {
        const compromisso = { start: '' };
        this.setState({ compromisso, isNew: true });
        this.handleOpenModal();
    }

    handleOnEventClick = (...data) => {
        const compromisso = data[0].calEvent;
        compromisso.start = compromisso.start.format(FORMAT_EVENT_DATETIME);
        compromisso.end = compromisso.end ? compromisso.end.format(FORMAT_EVENT_DATETIME) : null;
        this.setState({ compromisso, isNew: false });
        this.handleOpenModal();
    }

    handleOpenModal = () => {
        this.setState({ showCadastroCompromisso: true });
    }

    handleCloseModal = () => {
        this.setState({ showCadastroCompromisso: false });
    }

    saveCompromisso = (event, errors, values) => {
        if (errors.length === 0) {
            values.id ? this.props.updateCompromisso(values) : this.props.createCompromisso(values);
            this.handleCloseModal();
        }
        this.props.getCompromissos();
    }

    ajustarInicioFimEvento = (delta, event) => {
        let compromisso = event;
        const evento = _.cloneDeep(event);
        event.start.add(delta.days, 'days');
        event.start.add(delta.months, 'months');
        event.start.add(delta.hours, 'hours');
        event.start.add(delta.minutes, 'minutes');
        compromisso.start = event.start.format(FORMAT_EVENT_DATETIME);
        if (compromisso.end) {
          event.end.add(delta.days, 'days');
          event.end.add(delta.months, 'months');
          event.end.add(delta.hours, 'hours');
          event.end.add(delta.minutes, 'minutes');
          compromisso.end = event.end.format(FORMAT_EVENT_DATETIME);
        }
        compromisso = { id: compromisso.id, title: compromisso.title, descricao: compromisso.descricao, start: compromisso.start,
                        end: compromisso.end, marcador: compromisso.marcador, user: compromisso.user, paciente: compromisso.paciente};
        return [ compromisso, evento ];
    }

    handleEventDrop = (...data) => {
        const compromisso = this.ajustarInicioFimEvento(data[0].delta, data[0].event);
        // const compromisso = { title: ac.title, descricao: ac.descricao, start: ac.start, end: ac.end };
        this.props._updateCompromisso(compromisso[0]);
        this.agenda.schedule.fullCalendar('updateEvent', compromisso[1]);
    }

    handleEventResizeStop = (...data) => {
        this.handleEventDrop(data[0]);
    }

    render() {
        const { compromissos, loading, updating, marcadores } = this.props;
        const { showCadastroCompromisso, compromisso, isNew } = this.state;
        return(
            <div>
                <Button onClick={this.addCompromisso}>
                    Adicionar Compromisso
                </Button>
                <Schedule header={header} events={compromissos} onDayClick={this.handleOnDayClick}
                onEventClick={this.handleOnEventClick} onEventDrop={this.handleEventDrop}
                onEventResize={this.handleEventResizeStop} ref={input => this.agenda = input}/>
                <AgendaAddCompromisso showModal={showCadastroCompromisso} handleCloseFunction={this.handleCloseModal}
                compromisso={compromisso} loading={loading} updating={updating} handleSaveCompromisso={this.saveCompromisso}
                marcadores={marcadores}
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
