import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PaymentPaypalComponent } from '../payment-page/payment-checkout-page/payment-checkout-form/payment-paypal.component';

const declarations: any[] = [
  UserPageComponent,
  UserProfilePageComponent,

];
const imports = [
  CommonModule,
  SharedModule,
  HttpClientModule,
  UserPageRoutingModule,
  DialogModule,
  ButtonModule,
  TabViewModule

];

@NgModule({
  declarations: [...declarations, UserProfileFormComponent,],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class UserPageModule { }
