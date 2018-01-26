import {Component, OnDestroy} from '@angular/core';
import {MsgService} from '../../../shared/services/msg';
import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../../shared/models/user.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector   : 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls  : ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {

    public users: User[];
    private usersSubscribe: Subscription = new Subscription();

    constructor(private msgService: MsgService, private usersService: UsersService, private router: Router) {
        this.usersSubscribe.add(
            this.usersService.all().subscribe(
                users => {
                    this.users = users;
                },
                error => {
                    this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                }
            )
        );
    }

    ngOnDestroy() {
        this.usersSubscribe.unsubscribe();
    }

    public onNodeSelect(event: any) {
        const obj = event.node.data;
        this.router.navigate(['/admin/users/user', obj.id]);
    }
}
