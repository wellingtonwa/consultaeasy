import * as React from 'react';
import { Button, Label, Table } from 'reactstrap';
import { PubSub } from 'pubsub-js';

export interface IListaContatoProps {
    contatos: any[];
}

export default class ListaContato extends React.Component<IListaContatoProps, null> {

    constructor(props) {
        super(props);
    }

    editarContato = (contato, event) => {
        PubSub.publish('contato-showmodal', contato);
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
                        {contatos.map((contato, i) => (
                            <tr key={i}>
                                <th scope="row">{i}</th>
                                <td>{contato.tipoContato}</td>
                                <td>{contato.codigoArea}</td>
                                <td>{contato.contato}</td>
                                <td>
                                    <Button type="button" onClick={this.editarContato.bind(event, contato)}>Editar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
              </div>
        );
    }
}
