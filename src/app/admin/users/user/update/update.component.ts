import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../shared/services/users.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public user: User;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const user_id = +params['user'];
      this.usersService.get(user_id).subscribe(
        user => {
          this.user = user;
        }
      );
    });
  }

}
