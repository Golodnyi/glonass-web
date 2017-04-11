import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users/users.component';
import {ShowComponent} from './show/show.component';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [UsersComponent, ShowComponent],
    bootstrap: [UsersComponent]
})
export class UsersModule {
}
