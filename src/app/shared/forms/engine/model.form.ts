import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { EngineModel } from '../../models/engine-model.model';

@Injectable()
export class EngineModelForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(engineModel: EngineModel) {
    this.form = this.fb.group({
      name: [engineModel.name, Validators.required],
      sensors_config: [engineModel.sensors_config, Validators.required],
    });

    return this.form;
  }
}
