import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SplitButtonModule, TabMenuModule, ToolbarModule } from 'primeng/primeng';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports     : [
        CommonModule,
        AdminRoutingModule,
        TabMenuModule,
        SplitButtonModule,
        ToolbarModule,
        TranslateModule
    ],
    declarations: [AdminComponent],
    providers: [TranslatePipe]
})
export class AdminModule {
}
