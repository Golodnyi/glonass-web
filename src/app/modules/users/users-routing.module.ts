import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {ShowComponent} from './show/show.component';

const routes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'users/:id', component: ShowComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class UsersRoutingModule {
}
