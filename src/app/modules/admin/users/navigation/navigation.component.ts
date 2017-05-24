import { Component, OnDestroy } from '@angular/core';
import { MsgService } from '../../../../services/msg';
import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {

  public users: User[];
  private us: Subscription;

  constructor(private msgService: MsgService, private usersService: UsersService, private router: Router) {
    this.us = this.usersService.all().subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.us) {
      this.us.unsubscribe();
    }
  }

  public onNodeSelect(event: any) {
    const obj = event.node.data;
    this.router.navigate(['/admin/users/user', obj.id]);
  }
}
