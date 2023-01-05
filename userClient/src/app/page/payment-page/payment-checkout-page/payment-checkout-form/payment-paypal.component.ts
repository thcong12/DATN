import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { User } from 'src/app/shared/model/account.model';
import { OrderService } from 'src/app/shared/service/order.service';
import { UserService } from 'src/app/shared/service/user.service';
declare const paypal: any;
@Component({
  selector: 'checkoutPaypal',
  template: `<div #paypal></div>`
})
export class PaymentPaypalComponent implements OnInit, AfterViewInit {
  @Input() order!: FormGroup;
  @Input() cartId!:string;
  private userCart!:User.Cart;
  private orderId!:string
  @Output() orderChange = new EventEmitter();
  @ViewChild('paypal')
  paypalElement!: ElementRef;
  constructor(private formBd: FormBuilder, private orderSv: OrderService,private cartSv:UserService) {}
  ngAfterViewInit(): void {
    this.paypalPayment();
  }
  public formData() {}
  private paypalPayment() {
    const me = this;
    
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          me.orderSv.createOrder({...me.order.value,orderItem:me.userCart.cartDetail}).subscribe(x=>{
            me.orderId = x._id
          })
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: me.order.value.totalPrice as String,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          me.orderSv.paid(me.cartId,me.orderId,me.order.value).subscribe(
            {
              next: (orderId) => {
               alert("payment success")
              },
            }
          );
        },

        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(me.paypalElement.nativeElement);
  }

  private getData(){
    const me = this
    me.cartSv.getCart().subscribe(x=>{
      me.userCart = {...x}
    })
  }

  ngOnInit(): void {
    const me = this;
    me.getData()

  }
}
