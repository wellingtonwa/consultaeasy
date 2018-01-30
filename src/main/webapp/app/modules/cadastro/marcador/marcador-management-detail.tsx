import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getMarcador } from '../../../reducers/marcador-management';
import { APP_DATE_FORMAT, APP_ONLY_DATE_FORMAT } from '../../../config/constants';

export interface IMarcadorManagementDetailProps {
  getMarcador: ICrudGetAction;
  marcador: any;
  match: any;
}
export class MarcadorManagementDetail extends React.Component<IMarcadorManagementDetailProps, undefined> {

  componentDidMount() {
    this.props.getMarcador(this.props.match.params.id);
  }

  render() {
    const { marcador } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="marcadorManagement.detail.title">User</Translate> [<b>{marcador.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt><Translate contentKey="marcadorManagement.nome">Nome</Translate></dt>
          <dd>{marcador.nome}</dd>
          <dt><Translate contentKey="marcadorManagement.cor">Cor</Translate></dt>
          <dd>{marcador.cor}</dd>
          <dt><Translate contentKey="marcadorManagement.createdBy">Created By</Translate></dt>
          <dd>{marcador.createdBy}</dd>
          <dt><Translate contentKey="marcadorManagement.createdDate">Created Date</Translate></dt>
          <dd><TextFormat value={marcador.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></dd>
          <dt><Translate contentKey="marcadorManagement.lastModifiedBy">Last Modified By</Translate></dt>
          <dd>{marcador.lastModifiedBy}</dd>
          <dt><Translate contentKey="marcadorManagement.lastModifiedDate">Last Modified Date</Translate></dt>
          <dd><TextFormat value={marcador.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></dd>
        </dl>
        <Button
          tag={Link} to="/cadastro/marcador" replace
          color="info"
        >
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  marcador: storeState.marcadorManagement.marcador
});

const mapDispatchToProps = { getMarcador };

export default connect(mapStateToProps, mapDispatchToProps)(MarcadorManagementDetail);
