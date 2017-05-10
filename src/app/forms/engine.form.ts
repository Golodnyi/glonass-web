import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Engine } from '../models/Engine';

@Injectable()
export class EngineForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(engine: Engine) {
    this.form = this.fb.group({
      esn: [engine.esn, Validators.required],
      model_id: [engine.model_id, Validators.required],
      sensors_config: [engine.sensors_config, Validators.required],
    });

    return this.form;
  }
}
