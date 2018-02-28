import * as React from 'react';
import { Schedule } from 'primereact/components/schedule/Schedule';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.min.css';

export default class Agenda extends React.Component {

    render() {
        return(
            <div>
                <Schedule/>
            </div>
        );
    }

}
