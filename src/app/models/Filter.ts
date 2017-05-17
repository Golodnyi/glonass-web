import * as moment from 'moment';

export class Filter {
  charts: any = [];
  before: string = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  after: string = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}
