import * as moment from 'moment';
import { Params } from '@angular/router';

export class Filter {
  public charts: any = [];
  public last = true;
  public before: string = moment(new Date(new Date().getFullYear(), new Date().getMonth() - 1)).format('YYYY-MM-DD HH:mm:ss');
  public after: string = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  public enabled = false;

  constructor(filter: Params = null) {
    if (filter !== null) {
      this.charts = filter.charts;
      this.last = filter.last;
      this.before = filter.before;
      this.after = filter.after;
      this.enabled = filter.enabled === 'true' ? true : false;
    }
  }
}
