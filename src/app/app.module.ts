import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { CookieOptions, CookieService } from 'angular2-cookie/core';
import { GuestGuard } from './shared/guards/guest.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { ChartsService } from './shared/services/charts.service';
import { GrowlModule, MessagesModule } from 'primeng/primeng';
import { MsgService } from './shared/services/msg';
import { EnginesService } from './shared/services/engines.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    GrowlModule,
    MessagesModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: CookieOptions, useValue: {}},
    MsgService, UsersService, AuthService, AuthGuard, CookieService, GuestGuard, AdminGuard, ChartsService, EnginesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
