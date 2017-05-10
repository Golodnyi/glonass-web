import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable()
export class UserForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(user: User) {
    this.form = this.fb.group({
      login: [user.login, Validators.required],
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, Validators.required],
      role_id: [user.role_id, Validators.required],
      active: [user.active, Validators.required]
    });

    return this.form;
  }
}
