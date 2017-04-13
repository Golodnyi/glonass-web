import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {FormsModule} from '@angular/forms';
import {NavigationComponent} from './navigation/navigation.component';
import {TreeModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        TreeModule
    ],
    declarations: [AdminComponent,  NavigationComponent],
    bootstrap: [AdminComponent]
})
export class AdminModule {
}
