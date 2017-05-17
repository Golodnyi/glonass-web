import { Component, Input } from '@angular/core';
import { FilterForm } from '../../../forms/filter.form';
import { Filter } from '../../../models/Filter';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Calendar } from '../../../models/Calendar';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [FilterForm]
})
export class FilterComponent {
  @Input() data: any = false;
  public filter: Filter = new Filter();
  public ru = new Calendar();
  public form: FormGroup;
  public submit: boolean;

  constructor(private filterForm: FilterForm) {
    this.form = this.filterForm.create(this.filter);
    this.form.valueChanges
      .map((value) => {
        value.before = moment(value.before).format('YYYY-MM-DD HH:mm:ss');
        value.after = moment(value.after).format('YYYY-MM-DD HH:mm:ss');
        return value;
      })
      .subscribe((data) => {
        this.filter.charts = data.charts;
        this.filter.before = data.before;
        this.filter.after = data.after;
      });
  }

  public onSubmit() {
    console.log(this.filter);
  }
}
