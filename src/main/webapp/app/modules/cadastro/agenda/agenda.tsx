import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos, createCompromisso, updateCompromisso } from '../../../reducers/compromisso-management';
import { AgendaAddCompromisso } from './agenda-add-compromisso';
import { Button } from 'reactstrap';

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
        compromisso.start = data[0].date.format('YYYY-MM-DD[T]HH:mm');
        console.log(compromisso);
        this.setState({ compromisso, isNew: true });
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
            values.id ? this.props.createCompromisso(values) : this.props.updateCompromisso(values);
            this.handleCloseModal();
        }
        this.props.getCompromissos();
    }

    render() {
        const { compromissos, loading, updating } = this.props;
        const { showCadastroCompromisso, compromisso, isNew } = this.state;
        return(
            <div>
                <Button onClick={this.handleOpenModal}>
                    Adicionar Compromisso
                </Button>
                <Schedule events={compromissos} onDayClick={this.handleOnDayClick}/>
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
