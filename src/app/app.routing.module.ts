import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadChildren: './modules/auth/auth.module#AuthModule'
            },
            {
                path: 'dashboard',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'admin',
                loadChildren: './modules/admin/admin.module#AdminModule'
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
