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
        AuthModule,
        AppRoutingModule
    ],
    providers: [UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
