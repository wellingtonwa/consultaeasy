import * as React from 'react';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { getCompromissos, createCompromisso, updateCompromisso } from '../../../reducers/compromisso-management';

export interface IAgendaProps {
    getCompromissos: ICrudGetAction;
    createCompromisso: ICrudPutAction;
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
