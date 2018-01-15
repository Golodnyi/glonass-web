import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../../shared/services/users.service';
import { User } from '../../../../shared/models/user.model';
import { UserUpdateForm } from '../shared/user.update.form';
import { Role } from '../../../../shared/models/role.model';
import { FormGroup } from '@angular/forms';
import { MsgService } from '../../../../shared/services/msg';

@Component({
  selector: 'app-user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [UserUpdateForm]
})
export class UserUpdateComponent {
  public user: User;
  public roles: Role[];
  public form: FormGroup;
  public submit: boolean;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private userForm: UserUpdateForm,
              private msg: MsgService,
              private router: Router) {
    this.route.params.subscribe(params => {
      const user_id = +params['user'];
      this.usersService.get(user_id).subscribe(
        user => {
          this.user = user;
          this.form = this.userForm.create(this.user);
          this.form.valueChanges.subscribe((data) => {
            this.user.login = data.login;
            this.user.name = data.name;
            this.user.email = data.email;
            this.user.role_id = data.role_id;
          });
        }
      );
    });
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
    this.usersService.update(this.user).subscribe(
      user => {
        this.user = user;
        this.submit = false;
        this.msg.notice(MsgService.SUCCESS, 'Изменено', 'Пользователь ' + user.login + ' изменен');
        this.router.navigate(['/admin/users/user/', user.id]);
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }
}
