import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from "../../../models/User";
import {ModalService} from "../../../services/modal.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    private users: User[];

    constructor(private usersService: UsersService, private modal: ModalService) {
    }

    ngOnInit() {
        this.usersService.getUsers().subscribe(
            users => {
                this.users = users;
            },
            error => {
                this.modal.show('Ошибка', error);
            }
         );
    }

}
