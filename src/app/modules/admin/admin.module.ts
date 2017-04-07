import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from "./admin/admin.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ],
    declarations: [AdminComponent],
    bootstrap: [AdminComponent]
})
export class AdminModule {
}
