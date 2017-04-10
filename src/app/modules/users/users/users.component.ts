import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from "../../../models/User";
import {Message} from "primeng/primeng";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    private users: User[];
    private msgs: Message[] = [];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getUsers().subscribe(
            users => {
                this.users = users;
            },
            error => {
                this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
            }
         );
    }

}
