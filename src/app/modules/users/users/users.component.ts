import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/User';
import {MsgService} from '../../../services/msg';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public users: User[];

    constructor(private usersService: UsersService, private msgService: MsgService) {
    }

    ngOnInit() {
        this.usersService.getUsers().subscribe(
            users => {
                this.users = users;
            },
            error => {
                this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
            }
         );
    }
}
