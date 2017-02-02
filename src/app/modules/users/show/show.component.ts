import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from "../../../models/User";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  private user: User;
  constructor(private usersService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.usersService.getUser(this.route.snapshot.params['id']).subscribe(data => {
      this.user = data;
    });
  }

}
