import * as moment from 'moment';
import {Params} from '@angular/router';

export class Filter {
  public charts: any = [];
  public last = true;
  public before: string = moment(new Date(new Date().getFullYear(), new Date().getMonth() - 1)).format('YYYY-MM-DD HH:mm:ss');
  public after: string = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  public enabled = false;

  constructor(filter: Params = null) {
    if (filter !== null) {
      if (Array.isArray(filter.charts)) {
        this.charts = filter.charts;
      } else if (filter.charts && filter.charts !== undefined) {
        this.charts = [filter.charts];
      }
      this.last = filter.last === 'true';
      this.before = filter.before;
      this.after = filter.after;
      this.enabled = filter.enabled === 'true';
    }
  }
}
