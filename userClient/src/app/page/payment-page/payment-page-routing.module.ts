import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCheckoutPageComponent } from './payment-checkout-page/payment-checkout-page.component';
import { PaymentPageComponent } from './payment-page.component';


const routes: Routes = [
  {
    path:'',
    component:PaymentPageComponent,
    children:[
      {
        path:'',
        component:PaymentCheckoutPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentPageRoutingModule { }
