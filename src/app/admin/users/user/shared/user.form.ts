import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {User} from '../../../../shared/models/user.model';

@Injectable()
export class UserForm {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public create(user: User) {
    this.form = this.fb.group({
      login: [user.login, Validators.required],
      password: [user.password, [Validators.required, Validators.min(6)]],
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      role_id: [user.role_id, Validators.required],
      company_id: [user.company_id],
    });

    return this.form;
  }
}
