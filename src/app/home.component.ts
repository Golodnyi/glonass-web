import { Component } from '@angular/core';
import { MsgService } from './services/msg';
import { Message } from 'primeng/primeng';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) {
  }
}
