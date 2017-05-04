import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Auth } from '../models/Auth';
@Injectable()
export class AuthForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(auth: Auth) {
    this.form = this.fb.group({
      email: [auth.email, Validators.required],
      password: [auth.password, Validators.required],
      remember: [''],
    });

    return this.form;
  }
}