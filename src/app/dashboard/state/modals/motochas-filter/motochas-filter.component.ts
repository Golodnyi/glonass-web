import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MotochasFilterForm } from './shared/motochasFilter.form';
import { MotochasService } from './shared/motochas.service';
import { Car } from '../../../../shared/models/car.model';
import { MotochasFilter } from './shared/motochasFilter.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-motochas-filter',
  templateUrl: './motochas-filter.component.html',
  styleUrls: ['./motochas-filter.component.css'],
  providers: [MotochasFilterForm, MotochasService]
})
export class MotochasFilterComponent {
  @Input() car: Car;
  @Input() visible: boolean;
  @Output() hide = new EventEmitter();
  public submit: boolean;
  public data: MotochasFilter;
  public form: FormGroup;
  public hours: any;

  constructor(private motochasService: MotochasService, private motochasFilterForm: MotochasFilterForm) {
    this.form = this.motochasFilterForm.create();
    this.form.valueChanges
      .subscribe((data) => {
        this.hours = data.motochas;
      });
  }

  public onSubmit() {
    this.submit = true;
    this.motochasService.get(this.car, this.hours).subscribe(
      response => {
        this.data = response;
        this.submit = false;
      }
    );
  }

  public onHide() {
    this.hide.emit(true);
  }

  public onShow() {
    this.hide.emit(false);
  }
}
