import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app.routing.module';
import {UsersModule} from './modules/users/users.module';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {UsersService} from './services/users.service';
import {AuthModule} from "./modules/auth/auth.module";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {GuestGuard} from "./guards/guest.guard";
import {ModalModule} from 'ng2-bootstrap';
import {ModalComponent} from "./components/modal/modal.component";
import {ModalService} from "./services/modal.service";
import {AlertModule} from 'ng2-bootstrap';
import {BsDropdownModule} from 'ng2-bootstrap/dropdown/bs-dropdown.module';
import {AdminModule} from "./modules/admin/admin.module";
import {AdminGuard} from "./guards/admin.guard";

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        ModalComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        UsersModule,
        DashboardModule,
        AuthModule,
        AppRoutingModule,
        AdminModule,
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),
    ],
    providers: [UsersService, AuthService, AuthGuard, CookieService, GuestGuard, AdminGuard, ModalService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
