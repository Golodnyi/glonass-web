import * as moment from 'moment';

export interface IReport {
    before: string;
    after: string;
}

export class Report implements IReport {
    public before: string = moment(new Date(new Date().getFullYear(), new Date().getMonth() - 1)).format();
    public after: string  = moment(new Date()).format();
}
