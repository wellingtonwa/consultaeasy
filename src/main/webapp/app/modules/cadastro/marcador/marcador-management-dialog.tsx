import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';
import { ColorPicker } from 'primereact/components/colorpicker/ColorPicker';

import { getMarcador, updateMarcador, createMarcador } from '../../../reducers/marcador-management';
import { locales } from '../../../config/translation';

export interface IMarcadorManagementModelProps {
  getMarcador: ICrudGetAction;
  updateMarcador: ICrudPutAction;
  createMarcador: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  marcador: any;
  match: any;
  history: any;
}

export interface IMarcadorManagementModelState {
  showModal: boolean;
  isNew: boolean;
  cor: any;
}
export class MarcadorManagementDialog extends React.Component<IMarcadorManagementModelProps, IMarcadorManagementModelState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      isNew: !this.props.match.params || !this.props.match.params.id,
      cor: !this.props.marcador ? 'FFFFFF' : this.props.marcador.cor
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getMarcador(this.props.match.params.id);
  }

  componentWillReceiveProps(proximo) {

    this.setState({ cor: proximo.marcador.cor });
  }

  savePaciente = (event, errors, values) => {
    values.cor = this.state.cor;
    if (this.state.isNew) {
      this.props.createMarcador(values);
    } else {
      this.props.updateMarcador(values);
    }
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/cadastro/marcador');
  }

  colorPickerOnChange = e => {
    this.setState({ cor: e.value });
  }

  render() {
    const isInvalid = false;
    const { marcador, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal
        isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg"
      >
      <ModalHeader toggle={this.handleClose}><Translate contentKey="marcadorManagement.home.createOrEditLabel">Create or edit a User</Translate></ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : marcador} onSubmit={this.savePaciente} >
          <ModalBody>
            { marcador.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label for="nome"><Translate contentKey="marcadorManagement.nome">Nome</Translate></Label>
              <AvInput type="text" className="form-control" name="nome" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="cor"><Translate contentKey="marcadorManagement.cor">Cor</Translate></Label>
              <br/>
              <ColorPicker format="hex" value={this.state.cor} onChange={this.colorPickerOnChange}/>
            </AvGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan/>&nbsp;
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO/>&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      }
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  marcador: storeState.marcadorManagement.marcador,
  loading: storeState.marcadorManagement.loading,
  updating: storeState.marcadorManagement.updating
});

const mapDispatchToProps = { getMarcador, updateMarcador, createMarcador };

export default connect(mapStateToProps, mapDispatchToProps)(MarcadorManagementDialog);
