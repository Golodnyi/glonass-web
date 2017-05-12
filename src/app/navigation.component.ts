import { Component } from '@angular/core';
import { MsgService } from './services/msg';
import { Message } from 'primeng/primeng';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public user: User;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
