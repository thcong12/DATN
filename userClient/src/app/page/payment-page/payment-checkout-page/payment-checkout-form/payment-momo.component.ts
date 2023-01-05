import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/model/account.model';
import { OrderService } from 'src/app/shared/service/order.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'checkOutMomo',
  template: `<div #paypal>cc</div>`,
})
export class PaymentMomoComponent implements OnInit {
  @Input() order!: FormGroup;
  @Input() cartId!: string;
  private userCart!: User.Cart;
  private orderId!: string;
  @Output() orderChange = new EventEmitter();
  @ViewChild('paypal')
  paypalElement!: ElementRef;
  constructor(
    private formBd: FormBuilder,
    private orderSv: OrderService,
    private cartSv: UserService
  ) {}
  public formData() {}

  private getData() {
    const me = this;
    me.cartSv.getCart().subscribe((x) => {
      me.userCart = { ...x };
    });
  }

  ngOnInit(): void {
    const me = this;
    me.getData();
  }
}
