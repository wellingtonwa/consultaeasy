import * as React from 'react';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';

const littleBox = { height: '30px', width: '30px' };

export default class SelectMarcadorCompromisso extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    littleBox(marcador) {
        return(
            <div style={littleBox}>.</div>
        );
    }

    template(...marcador) {
        const am = marcador[0];
        return(
            <div className="ui-helper-clearfix">
                <div style={{ width: '25px', backgroundColor: `#${am.color}`, color: `#${am.color}`, margin: '5px 0 0 5px', float: 'left' }}>.</div>
                <div style={{ float: 'right', margin: '.5em .25em 0 0' }}>{am.label}</div>
            </div>
        );
    }

    buildSelectItens(marcadores: any[]) {
        const selectItems = [];
        marcadores.forEach(e => {
            selectItems.push({ label: e.nome, value: e.id, color: e.cor });
        });
        return selectItems;
    }

    render() {
        const marcadores = this.props.marcadores ? this.buildSelectItens(this.props.marcadores) : [];
        const { onChange, compromisso, panelClassName } = this.props;
        return(
            <Dropdown value={compromisso.marcador} className={panelClassName} options={marcadores} style={{ width: '250px' }} 
            itemTemplate={this.template} placeholder="Marcadores" onChange={onChange}/>
        );
    }
}
