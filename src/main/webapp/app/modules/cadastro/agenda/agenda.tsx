import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos, createCompromisso, updateCompromisso } from '../../../reducers/compromisso-management';
import AgendaAddCompromisso from './agenda-add-compromisso';

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
}

export class Agenda extends React.Component<IAgendaProps, IAgendaState> {

    constructor(props) {
        super(props);
        this.state = {
            showCadastroCompromisso: false,
            compromisso: {}
        };
    }

    componentDidMount() {
        this.props.getCompromissos();
    }

    handleOnDayClick = (...data) => {

    }

    handleCloseModal = () {
        this.setState({ showCadastroCompromisso: false });
    }

    render() {
        const { compromissos, loading, updating } = this.props;
        const { showCadastroCompromisso, compromisso } = this.state;
        return(
            <div>
                <Schedule events={compromissos} onDayClick={this.handleOnDayClick}/>
                <AgendaAddCompromisso showModal={showCadastroCompromisso} handleCloseFunction={this.handleCloseModal} 
                compromisso={compromisso} loading={loading} updating={updating}/>
            </div>
        );
    }

}

const mapStateToProps = storeState => ({
    compromissos: storeState.compromissoManagement.compromissos,
    compromisso: storeState.compromissoManagement.compromisso
});

const mapDispatchToProps = { getCompromissos };

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
