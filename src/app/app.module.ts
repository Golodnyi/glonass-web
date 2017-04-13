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
import {AuthModule} from './modules/auth/auth.module';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {GuestGuard} from './guards/guest.guard';
import {AdminModule} from './modules/admin/admin.module';
import {AdminGuard} from './guards/admin.guard';
import {ChartsService} from './services/charts.service';
import {GrowlModule, MessagesModule} from 'primeng/primeng';
import {MsgService} from './services/msg';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent
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
        GrowlModule,
        MessagesModule
    ],
    providers: [MsgService, UsersService, AuthService, AuthGuard, CookieService, GuestGuard, AdminGuard, ChartsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
