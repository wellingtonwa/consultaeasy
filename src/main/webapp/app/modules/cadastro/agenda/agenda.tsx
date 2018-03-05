import * as React from 'react';
import { connect } from 'react-redux';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos } from '../../../reducers/compromisso-management';

export interface IAgendaProps {
    getCompromissos: ICrudGetAction;
    compromissos: any[];
}

export class Agenda extends React.Component<IAgendaProps, null> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCompromissos();
    }

    handleOnDayClick = (...data) => {

    }

    render() {
        const { compromissos } = this.props;
        return(
            <div>
                <Schedule events={compromissos} onDayClick={this.handleOnDayClick}/>
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
