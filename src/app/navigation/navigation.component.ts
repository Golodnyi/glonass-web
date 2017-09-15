import {Component} from '@angular/core';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';

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
}
