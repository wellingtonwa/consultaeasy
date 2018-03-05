import * as React from 'react';
import { connect } from 'react-redux';

interface IAddCompromissoAgendaState {
  compromisso: any;
}

export class AgendaAddCompromisso extends React.Component<null, IAddCompromissoAgendaState> {

  constructor(props) {
    super(props);
    this.state = {
      compromisso: {}
    };
  }

}

const mapStateToProps = storeState => ({
  compromisso = storeState.compromissoManagement
})

const mapDispatchToProps = { getCompromisso, createCompromisso, updateCompromisso };

export default connect(mapDispatchToProps)(AgendaAddCompromisso);
