import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos, createCompromisso, updateCompromisso } from '../../../reducers/compromisso-management';
import { AgendaAddCompromisso } from './agenda-add-compromisso';
import { Button } from 'reactstrap';
import 'fullcalendar/dist/locale/pt-br.js';

export interface IAgendaProps {
    getCompromissos: ICrudGetAction;
    createCompromisso: ICrudPutAction;
    updateCompromisso: ICrudPutAction;
    compromissos: any[];
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
}

export class Agenda extends React.Component<IAgendaProps, IAgendaState> {

    constructor(props) {
        super(props);
        this.state = {
            showCadastroCompromisso: false,
            compromisso: {},
            isNew: true
        };
        
    }


    componentDidMount() {
        this.props.getCompromissos();
    }

    handleOnDayClick = (...data) => {
        const { compromisso } = this.state;
        compromisso.start = data[0].date.format(FORMAT_EVENT_DATETIME);
        this.setState({ compromisso, isNew: true });
        this.handleOpenModal();
    }

    addCompromisso = () => {
        let compromisso = {};
        this.setState({ compromisso, isNew: true });
        this.handleOpenModal();
    }

    handleOnEventClick = (...data) => {
        let compromisso = data[0].calEvent;
        compromisso.start = compromisso.start.format(FORMAT_EVENT_DATETIME);
        compromisso.end = compromisso.end.format(FORMAT_EVENT_DATETIME);
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

    ajustarInicioFimEvento = (delta, compromisso) => {
        compromisso.start.add(delta.days, 'days');
        compromisso.start.add(delta.months, 'months');
        compromisso.start.add(delta.hours, 'hours');
        compromisso.end.add(delta.days, 'days');
        compromisso.end.add(delta.months, 'months');
        compromisso.end.add(delta.hours, 'hours');
        compromisso.start = compromisso.start.format(FORMAT_EVENT_DATETIME);
        compromisso.end = compromisso.end.format(FORMAT_EVENT_DATETIME);
        return compromisso;
    }

    handleEventDrop = (...data) => {
        let compromisso = this.ajustarInicioFimEvento(data[0].delta, data[0].event);
        console.log(compromisso);
        this.props.updateCompromisso(compromisso);
    }

    render() {
        const { compromissos, loading, updating } = this.props;
        const { showCadastroCompromisso, compromisso, isNew } = this.state;
        return(
            <div>
                <Button onClick={this.addCompromisso}>
                    Adicionar Compromisso
                </Button>
                <Schedule header={header} events={compromissos} onDayClick={this.handleOnDayClick}
                 onEventClick={this.handleOnEventClick} onEventDrop={this.handleEventDrop}/>
                <AgendaAddCompromisso showModal={showCadastroCompromisso} handleCloseFunction={this.handleCloseModal}
                compromisso={compromisso} loading={loading} updating={updating} handleSaveCompromisso={this.saveCompromisso}
                isNew={isNew}/>
            </div>
        );
    }

}

const mapStateToProps = storeState => ({
    compromissos: storeState.compromissoManagement.compromissos,
    compromisso: storeState.compromissoManagement.compromisso
});

const mapDispatchToProps = { getCompromissos, createCompromisso, updateCompromisso };

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
