import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class PacienteContatoCadastro extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>
                    Cadastro do contato
                </h2>
                <FormGroup>
                    <Label for="tipoContato">Tipo de Contato</Label>
                    <Input type="select">
                        <option value="TELEFONE">Telefone</option>
                        <option value="EMAIL">E-mail</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="codigoArea">Código de Área</Label>
                    <Input type="text" name="codigoArea"/>
                </FormGroup>
                <FormGroup>
                    <Label for="contato">Contato</Label>
                    <Input type="text" name="contato"/>
                </FormGroup>
            </div>
        );
    }

}
