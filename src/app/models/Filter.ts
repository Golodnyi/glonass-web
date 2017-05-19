import * as moment from 'moment';

export class Filter {
  charts: any = [];
  last = true;
  before: string = moment(new Date(new Date().getFullYear(), new Date().getMonth() - 1)).format('YYYY-MM-DD HH:mm:ss');
  after: string = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  enabled: boolean;
}
