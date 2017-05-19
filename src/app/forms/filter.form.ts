import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Filter } from '../models/Filter';

@Injectable()
export class FilterForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(filter: Filter) {
    this.form = this.fb.group({
      charts: [filter.charts, Validators.required],
      last: [filter.last],
      before: [moment(filter.before).toDate()],
      after: [moment(filter.after).toDate()],
      enabled: [filter.enabled],
    });

    return this.form;
  }
}
