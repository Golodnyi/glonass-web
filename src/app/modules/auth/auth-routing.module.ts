import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component'
import {GuestGuard} from "../../guards/guest.guard";

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule {
}
