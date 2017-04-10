import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from "../../../models/User";
import {ActivatedRoute} from '@angular/router';
import {Message} from "primeng/primeng";

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

    private user: User;
    private msgs: Message[] = [];

    constructor(private usersService: UsersService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.usersService.getUser(this.route.snapshot.params['id']).subscribe(
            user => {
                this.user = user;
            },
            error => {
                this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
            }
        );
    }

}
