import { Component } from '@angular/core';
import { MsgService } from './shared/services/msg';
import { Message } from 'primeng/primeng';
import { User } from './shared/models/user.model';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-run',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public growl: Message[] = [];
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
  }
}
