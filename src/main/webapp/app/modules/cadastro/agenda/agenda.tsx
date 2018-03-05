import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos } from '../../../reducers/compromisso-management';

export interface IAgendaState {
    compromissos: any[];
}

export interface IAgendaProps {
    getCompromissos: ICrudGetAction;
}

export class Agenda extends React.Component<IAgendaProps, IAgendaState> {

    constructor(props) {
        super(props);
        this.state = {
            compromissos: []
        };
    }

    componentDidMount() {
        this.props.getCompromissos();
    }

    render() {
        const { compromissos } = this.state;
        return(
            <div>
                <Schedule events={compromissos}/>
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
