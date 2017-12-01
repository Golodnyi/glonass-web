import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ResetForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create() {
    this.form = this.fb.group({
      created_at: [moment(new Date()).toDate(), Validators.required],
      comment: ['', Validators.required]
    });

    return this.form;
  }
}
