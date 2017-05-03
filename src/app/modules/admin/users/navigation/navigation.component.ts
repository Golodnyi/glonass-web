import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../../services/msg';
import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public users: User[];

  constructor(private msgService: MsgService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.all().subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public onNodeSelect(event: any) {
  }
}
