import { Component } from '@angular/core';
import { MsgService } from './services/msg';
import { Message } from 'primeng/primeng';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-run',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public growl: Message[] = [];
  public msg: Message[] = [];
  public user: User;

  constructor(private msgService: MsgService, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });

    this.msgService.getNotice().subscribe(
      notice => {
        this.growl = [];
        this.growl.push(notice);
      }
    );

    this.msgService.getMsg().subscribe(
      msg => {
        this.msg.push(msg);
      }
    );
  }

  public logout() {
    this.authService.logout();
  }
}
