import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, Av } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';
import { PubSub } from 'pubsub-js';

import { getPaciente } from '../../../reducers/paciente-management';
import { getContato, createContato, updateContato } from '../../../reducers/contato-management';
import { locales } from '../../../config/translation';

export interface IContatoManagementModelProps {
  getContato: ICrudGetAction;
  getPaciente: ICrudGetAction;
  createContato: ICrudPutAction;
  updateContato: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  paciente: any;
  contato: any;
  match: any;
  history: any;
}

export interface IContatoManagementModelState {
  isNew: boolean;
  tipoContato: any;
  contato: any;
  erro: string;
}
export class ContatoManagementDialog extends React.Component<IContatoManagementModelProps, IContatoManagementModelState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      erro: null,
      tipoContato: 'TELEFONE',
      contato: {}
    };
  }

  saveContato = (event, errors, values) => {
    console.log(values);
    if (errors.length === 0) {
      values.id ? this.props.createContato(values.idPaciente, values) : this.props.updateContato(values.idPaciente, values);
      this.props.createContato(values.idPaciente, values);
      this.handleClose();
    }
  }

  componentDidMount() {
    this.verificarUrl(this.props);
  }

  async verificarUrl(props) {
    let auxIsNew = false;
    if (props.match.url.indexOf('/contato/new') !== -1) {
      auxIsNew = true;
      this.setState({ tipoContato: 'TELEFONE', contato: { tipoContato: 'TELEFONE', idPaciente: props.match.params.id } });
    }
    if (props.match.params && props.match.params.idContato) {
      auxIsNew = true;
      const result = await this.props.getContato(props.match.params.idContato);
      this.setState({ tipoContato: result.value.data.tipoContato, contato: result.value.data });
    }
    this.props.getPaciente(props.match.params.id);
    this.setState({ isNew: auxIsNew });

  }

  handleTipoContato = event => {
    const { contato } = this.state;
    contato.tipoContato = contato.tipoContato === 'TELEFONE' ? 'EMAIL' : 'TELEFONE';
    this.setState({ contato });
  }

  handleClose = () => {
    this.props.history.push(`/cadastro/paciente/${this.props.match.params.id}/edit`);
  }

  render() {
    const isInvalid = false;
    const { paciente, loading, updating, match } = this.props;
    const { isNew, contato, tipoContato } = this.state;
    return (
      <div>
        <h2>
          <Translate contentKey="contatoManagement.home.createOrEditLabel">
            Create or edit a User
          </Translate>
          ({loading ? <span>carregando...</span> : paciente.nomeCompleto})
        </h2>
        { loading ? <p>Loading...</p>
        : <AvForm model={isNew ? { idPaciente: match.params.id, tipoContato: 'TELEFONE' } : contato} onSubmit={this.saveContato} >
              { contato.id ?
                <AvGroup>
                  <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                  <AvInput type="text" className="form-control" name="id" value={contato.id} required readOnly/>
                </AvGroup>
                : null
              }
              <AvInput type="hidden" className="form-control" name="idPaciente" value={contato.idPaciente}/>
              <AvGroup>
                <Label for="tipoContato"><Translate contentKey="contatoManagement.tipoContato">Código de Área</Translate></Label>
                <AvInput type="select" className="form-control" name="tipoContato"
                  value={contato.tipoContato}
                  onChange={this.handleTipoContato.bind(event)}>
                  <option value="TELEFONE">Telefone</option>
                  <option value="EMAIL">E-mail</option>
                </AvInput>
              </AvGroup>
              { contato.tipoContato === 'TELEFONE'
                ? <div>
                    <AvGroup>
                      <Label for="codigoArea"><Translate contentKey="contatoManagement.codigoArea">Código de Área</Translate></Label>
                      <AvInput type="text" className="form-control" name="codigoArea" value={contato.codigoArea} required/>
                      <AvFeedback>Este campo é obrigatório.</AvFeedback>
                    </AvGroup>
                  </div>
                : null
              }
              <AvGroup>
                <Label for="contato"><Translate contentKey={`tipoContato.${contato.tipoContato}`}>Contato</Translate></Label>
                <AvInput type="text" className="form-control" name="contato" value={contato.contato} required/>
                <AvFeedback>Este campo é obrigatório.</AvFeedback>
              </AvGroup>
              <div>
                <Button color="secondary" onClick={this.handleClose}>
                  <FaBan/>&nbsp;
                  <Translate contentKey="entity.action.cancel">Cancel</Translate>
                </Button>
                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                  <FaFloppyO/>&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </div>
          </AvForm>
        }
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  paciente: storeState.pacienteManagement.paciente,
  contato: storeState.contatoManagement.contato,
  loading: storeState.contatoManagement.loading,
  updating: storeState.contatoManagement.updating
});

const mapDispatchToProps = { getContato, createContato, getPaciente, updateContato };

export default connect(mapStateToProps, mapDispatchToProps)(ContatoManagementDialog);
