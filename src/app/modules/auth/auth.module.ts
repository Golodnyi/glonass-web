import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  bootstrap: [LoginComponent]
})
export class AuthModule {
}
