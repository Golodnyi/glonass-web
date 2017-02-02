import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from "../../../models/User";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    private users: User[];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getUsers().subscribe(data => {
            this.users = data;
        });
    }

}
