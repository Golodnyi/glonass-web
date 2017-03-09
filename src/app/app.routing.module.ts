import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'users',
                loadChildren: './modules/users/users-routing.module#UsersRoutingModule'
            },
            {
                path: 'login',
                loadChildren: './modules/auth/auth-routing.module#AuthRoutingModule'
            },
            {
                path: 'dashboard',
                loadChildren: './modules/dashboard/dashboard-routing.module#DashboardRoutingModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
