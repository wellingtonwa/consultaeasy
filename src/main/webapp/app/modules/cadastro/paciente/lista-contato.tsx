import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { PubSub } from 'pubsub-js';

export interface IListaContatoProps {
    contatos: any[];
}

export default class ListaContato extends React.Component<IListaContatoProps, null> {

    constructor(props) {
        super(props);
    }

    render() {
        const { contatos } = this.props;
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo contato</th>
                        <th>Código de Área</th>
                        <th>Contato</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                        {contatos.length === 0 ?
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>Nenhum contato cadastrado</td>
                            </tr>
                            : contatos.map((contato, i) => (
                                <tr key={i}>
                                    <td scope="row">{i}</td>
                                    <td><Translate contentKey={`tipoContato.${contato.tipoContato}`}>Tipo de Contato</Translate></td>
                                    <td>{contato.codigoArea}</td>
                                    <td>{contato.contato}</td>
                                    <td>
                                        <Button color="primary" tag={Link} to={`/cadastro/paciente/${contato.idPaciente}/edit/contato/edit/${contato.id}`}>Editar</Button>
                                        &nbsp;
                                        <Button color="danger" tag={Link} to={`/cadastro/paciente/${contato.idPaciente}/edit/contato/delete/${contato.id}`}>Excluir</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
              </div>
        );
    }
}
