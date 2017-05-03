import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ButtonModule, ToolbarModule, TreeModule } from 'primeng/primeng';
import { NavigationComponent } from './navigation/navigation.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { UserCreateComponent } from './user/create/create.component';
import { UserUpdateComponent } from './user/update/update.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ToolbarModule,
    ButtonModule,
    TreeModule,
    PipesModule
  ],
  declarations: [UsersComponent, NavigationComponent, UserCreateComponent, UserUpdateComponent],
  providers: [],
})
export class UsersModule {
}
