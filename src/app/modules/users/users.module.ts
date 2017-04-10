import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users/users.component';
import {ShowComponent} from './show/show.component';
import {GrowlModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        GrowlModule
    ],
    declarations: [UsersComponent, ShowComponent],
    bootstrap: [UsersComponent]
})
export class UsersModule {
}
