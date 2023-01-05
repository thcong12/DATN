import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthUseractiveComponent } from './auth-useractive/auth-useractive.component';
import { AuthChangePasswordComponent } from './auth-change-password/auth-change-password.component';


const declarations: any[] = [
  AuthPageComponent,
  AuthUseractiveComponent,
  AuthLoginComponent, AuthRegisterComponent

];
const imports = [
  CommonModule,
  SharedModule,
  AuthPageRoutingModule,
  HttpClientModule,
  ToastModule,
  TableModule,
  ButtonModule,
  TabViewModule,
 DialogModule
];

@NgModule({
  declarations: [...declarations, AuthChangePasswordComponent,],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class AuthPageModule {}
