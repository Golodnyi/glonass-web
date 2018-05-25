import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './login/shared/guards/guest.guard';
import { AdminGuard } from './admin/shared/admin.guard';
import { ChartsService } from './shared/services/charts.service';
import { GrowlModule, MessagesModule } from 'primeng/primeng';
import { MsgService } from './shared/services/msg';
import { EnginesService } from './shared/services/engines.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomeRuComponent } from './home/ru/home.component';
import { HomeEnComponent } from './home/en/home.component';
import { HomeCnComponent } from './home/cn/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/TokenInterceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorService } from './shared/services/error.service';
import { SharedModule } from './shared/shared.module';
import { KeysPipe } from './shared/pipes/keys.pipe';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, environment.lang, '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        FooterComponent,
        HomeComponent,
        HomeRuComponent,
        HomeEnComponent,
        HomeCnComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports     : [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        GrowlModule,
        MessagesModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide   : TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps      : [HttpClient]
            }
        }),
        DropdownModule
    ],
    providers   : [
        MsgService, UsersService, AuthService, AuthGuard, GuestGuard, AdminGuard, ChartsService, EnginesService, KeysPipe,
        ErrorService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi   : true
        }
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
