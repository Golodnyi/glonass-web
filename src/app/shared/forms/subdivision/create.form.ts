import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subdivision } from '../../models/subdivision.model';

@Injectable()
export class SubdivisionCreateForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(subdivision: Subdivision) {
    this.form = this.fb.group({
      name: [subdivision.name, Validators.required],
      company_id: [subdivision.company_id, Validators.required],
    });

    return this.form;
  }
}
