import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Car } from '../../../../shared/models/car.model';

@Injectable()
export class CarUpdateForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(car: Car) {
    this.form = this.fb.group({
      model_id: [car.model_id, Validators.required],
      name: [car.name, Validators.required],
      is_visible: [car.is_visible, Validators.required],
    });

    return this.form;
  }
}
