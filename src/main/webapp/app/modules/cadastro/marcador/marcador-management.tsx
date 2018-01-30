import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import { getMarcadores } from '../../../reducers/marcador-management';
import { APP_DATE_FORMAT, APP_ONLY_DATE_FORMAT } from '../../../config/constants';

export interface IMarcadorManagementProps {
  getMarcadores: ICrudGetAction;
  marcadores: any[];
  match: any;
}

export class MarcadorManagement extends React.Component<IMarcadorManagementProps, undefined> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMarcadores();
  }

  render() {
    const { marcadores, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="marcadorManagement.home.title">Users</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="marcadorManagement.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="marcadorManagement.nome">Nome</Translate></th>
                <th><Translate contentKey="marcadorManagement.cor">Cor</Translate></th>
                <th />
                <th><Translate contentKey="marcadorManagement.createdDate">Created Date</Translate></th>
                <th><Translate contentKey="marcadorManagement.lastModifiedBy">Last Modified By</Translate></th>
                <th><Translate contentKey="marcadorManagement.lastModifiedDate">Last Modified Date</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
              marcadores.map((marcador, i) => (
                <tr key={`marcador-${i}`}>
                  <td>
                    <Button
                      tag={Link} to={`${match.url}/${marcador.id}`}
                      color="link" size="sm"
                    >
                      {marcador.id}
                    </Button>
                  </td>
                  <td>{marcador.nome}</td>
                  <td>{marcador.cor}</td>
                  <td/>
                  <td><TextFormat value={marcador.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></td>
                  <td>{marcador.lastModifiedBy}</td>
                  <td><TextFormat value={marcador.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /></td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link} to={`${match.url}/${marcador.id}`}
                        color="info" size="sm"
                      >
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button
                        tag={Link} to={`${match.url}/${marcador.id}/edit`}
                        color="primary" size="sm"
                      >
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button
                        tag={Link} to={`${match.url}/${marcador.id}/delete`}
                        color="danger" size="sm"
                      >
                        <FaTrash/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete" /></span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  marcadores: storeState.marcadorManagement.marcadores,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getMarcadores };

export default connect(mapStateToProps, mapDispatchToProps)(MarcadorManagement);
