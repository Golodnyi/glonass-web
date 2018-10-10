import * as moment from 'moment';
import { IIssue } from './issue.model';
import { IBattery } from './battery.model';
import { IMaintenances } from './maintenances.model';

export interface IState {
    time: string;
    engine: boolean;
    watch: boolean;
    gsm: boolean;
    network: boolean;
    networkSignal: number;
    roaming: boolean;
    power: boolean;
    motochas: number;
    imei: number;
    issues: IIssue[];
    maintenance_date: string;
    maintenances: IMaintenances;
    battery: IBattery,
}

export class State implements IState {
    public last_time: string = moment().format('DD.MM.YYYY HH:mm:ss');
    timestamp: string;
    first_event_base: string;
    public engine: boolean;
    public watch: boolean;
    public gsm: boolean;
    public network: boolean;
    public networkSignal: number;
    public roaming: boolean;
    public power: boolean;
    public motochas          = 0;
    public imei              = 0;
    public issues: IIssue[]  = [];
    public maintenance_date: string;
    public maintenances: IMaintenances;
    public battery: IBattery
    get time() {
        return this.last_time;
    }

    set time(t) {
        this.timestamp = t;
        this.last_time = moment(t).format('DD.MM.YYYY HH:mm:ss');
    }

    get first_event() {
        return this.first_event_base;
    }

    set first_event(t) {
        this.timestamp = t;
        this.first_event_base = moment(t).format('DD.MM.YYYY HH:mm:ss');
    }
}
