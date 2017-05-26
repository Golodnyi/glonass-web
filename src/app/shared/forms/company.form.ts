import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import * as moment from 'moment';

@Injectable()
export class CompanyForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(company: Company) {
    this.form = this.fb.group({
      name: [company.name, Validators.required],
      active_till: [moment(company.active_till).toDate(), Validators.required],
    });

    return this.form;
  }
}
