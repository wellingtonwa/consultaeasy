import { ICrudGetAction, ICrudPutAction, Translate } from 'react-jhipster';
import * as React from 'react';
import { connect } from 'react-redux';
import { getCompromissos } from "../../../reducers/lista-compromisso-management";

export interface IListaCompromissoProps {
  getCompromissos: ICrudGetAction;
  compromissos: any[];
}

export class ListaCompromisso extends React.Component<IListaCompromissoProps>{


  componentDidMount() {

  }

  render() {
    return (
      <div>
        Funcionou!
      </div>
    );
  }

}

const mapStateToProps =  storeState => ({
  compromissos: storeState.listaCompromissoManagement.compromissos
});

const mapDispatchToProps = {
  getCompromissos
};

export default connect(mapStateToProps, mapDispatchToProps) (ListaCompromisso);
