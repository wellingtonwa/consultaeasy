import * as React from 'react';
import { connect } from 'react-redux';
import { ICrudGetAction, ICrudPutAction, Translate } from 'react-jhipster';
import { getCompromisso, updateCompromisso, createCompromisso } from '../../../reducers/compromisso-management';

export interface IAddCompromissoAgendaProps {
  getCompromisso: ICrudGetAction;
  createCompromisso: ICrudPutAction;
  updateCompromisso: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  compromisso: any;
  match: any;
  history: any;
}

interface IAddCompromissoAgendaState {
  isNew: Boolean;
  compromisso: any;
}

export class AgendaAddCompromisso extends React.Component<IAddCompromissoAgendaProps, IAddCompromissoAgendaState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      compromisso: {}
    };
  }

  render() {
    const { isNew, compromisso } = this.state;
    const { loading } = this.props;
    return(
      <div>
        <h2>
          <Translate contentKey="contatoManagement.home.createOrEditLabel">
            Create or edit a User
          </Translate>
          ({loading ? <span>carregando...</span>})
        </h2>
      </div>
    );
  }

}

const mapStateToProps = storeState => ({
  compromisso: storeState.compromissoManagement.compromisso
});

const mapDispatchToProps = { getCompromisso, createCompromisso, updateCompromisso };

export default connect(mapDispatchToProps)(AgendaAddCompromisso);
