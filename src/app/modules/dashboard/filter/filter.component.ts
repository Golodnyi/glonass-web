import { Component, Input } from '@angular/core';
import { FilterForm } from '../../../forms/filter.form';
import { Filter } from '../../../models/Filter';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Calendar } from '../../../models/Calendar';
import { ChartsService } from '../../../services/charts.service';
import { Car } from '../../../models/Car';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [FilterForm]
})
export class FilterComponent {
  @Input() data: any = false;
  @Input() car: Car;
  public filter: Filter = new Filter();
  public ru = new Calendar();
  public form: FormGroup;

  constructor(private filterForm: FilterForm,
              private chartsService: ChartsService) {
    this.form = this.filterForm.create(this.filter);
    this.form.valueChanges
      .map((value) => {
        value.before = moment(value.before).format('YYYY-MM-DD');
        value.after = moment(value.after).format('YYYY-MM-DD');
        return value;
      })
      .subscribe((data) => {
        this.filter.charts = data.charts;
        this.filter.before = data.before;
        this.filter.after = data.after;
        this.filter.enabled = data.enabled;
        this.chartsService.setFilter(this.filter);
      });
  }
}
