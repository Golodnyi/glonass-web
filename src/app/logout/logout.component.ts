import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MsgService } from '../shared/services/msg';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService: AuthService,
              private msgService: MsgService,
              private router: Router) {
    this.authService.logout().subscribe(
      logout => {
        if (logout === false) {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', 'Не удалось выйти из системы, попробуйте позже.');
        }
        this.router.navigate(['/']);
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }
}
