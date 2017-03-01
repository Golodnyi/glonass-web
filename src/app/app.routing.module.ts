import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '', component: null,
        children: [
            {
                path: 'users',
                loadChildren: './modules/users/users-routing.module#UsersRoutingModule'
            },
            {
                path: 'login',
                loadChildren: './modules/auth/auth-routing.module#AuthRoutingModule'
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
