import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilterForm } from '../../shared/forms/filter.form';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Calendar } from '../../shared/models/calendar.model';
import { ChartsService } from '../../shared/services/charts.service';
import { Car } from '../../shared/models/car.model';
import { Sensor } from '../../shared/models/sensor.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [FilterForm]
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() car: Car;
  @Input() filter: any;
  public ru = new Calendar();
  public form: FormGroup = null;
  public submit: boolean;
  private sensors: Sensor[];
  private subscription: Subscription = new Subscription();

  constructor(private filterForm: FilterForm,
              private chartsService: ChartsService,
              private router: Router) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(this.chartsService.getSensors().subscribe(
      sensors => {
        this.sensors = sensors;
        this.form = this.filterForm.create(this.filter);
        this.form.valueChanges
          .map((value) => {
            value.before = moment(value.before).format('YYYY-MM-DD');
            value.after = moment(value.after).format('YYYY-MM-DD');
            return value;
          })
          .subscribe((data) => {
            this.filter.charts = data.charts;
            this.filter.last = data.last;
            this.filter.before = data.before;
            this.filter.after = data.after;
            this.submit = false;
          });
      }
      )
    );
  }

  public onSubmit() {
    this.filter.enabled = true;
    this.submit = true;
    let qparams;
    if (this.filter.charts && !Array.isArray(this.filter.charts)) {
      this.filter.charts = [this.filter.charts];
    }
    qparams = this.filter;
    this.router.navigate([], {queryParams: qparams});
  }

  public onDisabled() {
    this.filter.enabled = false;
    this.submit = false;
    this.router.navigate([], {queryParams: {}});
    return false;
  }
}
