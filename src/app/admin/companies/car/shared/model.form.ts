import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CarModel } from '../../../../shared/models/car-model.model';

@Injectable()
export class CarModelForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(carModel: CarModel) {
    this.form = this.fb.group({
      name: [carModel.name, Validators.required]
    });

    return this.form;
  }
}
