import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserCreateComponent} from './user/create/create.component';
import {UserUpdateComponent} from './user/update/update.component';

const routes: Routes = [
    {
        path    : '', component: UsersComponent,
        children: [
            {path: 'user/create', component: UserCreateComponent},
            {path: 'user/:user', component: UserUpdateComponent}
        ]
    }
];

@NgModule({
    imports  : [RouterModule.forChild(routes)],
    exports  : [RouterModule],
    providers: []
})
export class UsersRoutingModule {
}
