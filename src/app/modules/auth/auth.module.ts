import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {GrowlModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        GrowlModule
    ],
    declarations: [LoginComponent],
    bootstrap: [LoginComponent]
})
export class AuthModule {
}
