import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { TabMenuModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TabMenuModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {
}
