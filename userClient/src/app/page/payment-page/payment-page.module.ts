import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { PaymentCheckoutPageComponent } from './payment-checkout-page/payment-checkout-page.component';
import { PaymentPageComponent } from './payment-page.component';
import { PaymentPageRoutingModule } from './payment-page-routing.module';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { PaymentCheckoutFormComponent } from './payment-checkout-page/payment-checkout-form/payment-checkout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentPaypalComponent } from './payment-checkout-page/payment-checkout-form/payment-paypal.component';
import { PaymentMomoComponent } from './payment-checkout-page/payment-checkout-form/payment-momo.component';


const declarations: any[] = [PaymentCheckoutPageComponent,PaymentPageComponent,PaymentCheckoutFormComponent,PaymentPaypalComponent,PaymentMomoComponent];
const imports = [
  CommonModule,
  SharedModule,
  HttpClientModule,
  PaymentPageRoutingModule,
  ButtonModule,
  RatingModule,
  TableModule,
  ReactiveFormsModule,
];
@NgModule({
  declarations: [...declarations, ],
  imports: [
    ...imports
  ]
})
export class PaymentPageModule { }
