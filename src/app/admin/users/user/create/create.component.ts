import { Component } from '@angular/core';
import { UsersService } from '../../../../shared/services/users.service';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../shared/models/user.model';
import { MsgService } from '../../../../shared/services/msg';
import { Router } from '@angular/router';
import { Role } from '../../../../shared/models/role.model';
import { UserForm } from '../shared/user.form';
import { CompaniesService } from '../../../../shared/services/companies.service';
import { Company } from '../../../../shared/models/company.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [UserForm, CompaniesService]
})
export class UserCreateComponent {
  public user: User = new User();
  public roles: Role[];
  public form: FormGroup;
  public submit: boolean;
  public companies: Company[];

  constructor(private userForm: UserForm,
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private msg: MsgService,
    private router: Router) {
    this.form = this.userForm.create(this.user);
    this.form.valueChanges.subscribe((data) => {
      this.user = data;
    });
    this.companiesService.all(true).subscribe(
      companies => {
        this.companies = companies;
      }
    );
    this.usersService.roles().subscribe(
      roles => {
        this.roles = roles;
      },
      error => {
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public onSubmit() {
    this.submit = true;
    this.usersService.create(this.user).subscribe(
      user => {
        this.user = user;
        this.submit = false;
        this.msg.notice(MsgService.SUCCESS, 'Создано', 'Пользователь ' + user.login + ' создан');
        this.router.navigate(['/admin/users/user/', user.id]);
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }
}
