import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {NewEngine} from './newEngine.model';

@Injectable()
export class EngineCreateForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(newEngine: NewEngine) {
    this.form = this.fb.group({
      car_id: [newEngine.car_id, Validators.required],
      esn: [newEngine.engine.esn, Validators.required],
      model_id: [newEngine.engine.model_id, Validators.required],
      company_id: [newEngine.engine.company_id, Validators.required],
      subdivision_id: [newEngine.subdivision_id, Validators.required],
    });

    return this.form;
  }
}
