import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/model/account.model';

@Component({
  selector: 'app-payment-checkout-form',
  templateUrl: './payment-checkout-form.component.html',
  styleUrls: ['./payment-checkout-form.component.scss'],
})
export class PaymentCheckoutFormComponent implements OnInit {
  public checkOutForm!: FormGroup;
  public data!: any;
  public paymentOption: any = null;
  public total!: BehaviorSubject<number>;
  @Input() userCart!: User.Cart;
  public paymentMethod: any = [
    {
      name: 'Paypal',
      value: 'paypal',
      img: 'https://cdn-icons-png.flaticon.com/512/174/174861.png',
    },
    {
      name: 'Momo',
      value: 'momo',
      img: 'https://static.mservice.io/img/logo-momo.png',
    },
  ];
  public controlName = {
    address: 'address',
    paymentMethod: 'paymentMethod',
    disCountCode: 'disCountCode',
    totalPrice: 'totalPrice',
  };
  public optionPayment(option: any) {
    this.paymentOption = option;
    this.checkOutForm.get(this.controlName.paymentMethod)?.patchValue(option)
  }
  constructor(private formBd: FormBuilder) {}

  private formInit() {
    const me = this;

    me.checkOutForm = me.formBd.group({
      [me.controlName.address]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
      [me.controlName.paymentMethod]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
      [me.controlName.disCountCode]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
      [me.controlName.totalPrice]: [
        { disabled: false, value: '' },
        Validators.required,
      ],
    });
  }
  private getTotalPrice() {
    let total = 0;
    this.userCart.cartDetail.map((item) => {
      total +=
        (item.product.price -
          (item.product.price * item.product.sale.salePersent) / 100) *
        item.quantity;
    });
    total =  total - this.checkOutForm.get(this.controlName.disCountCode)?.value
    return this.totalprice?.patchValue(total);
  }
  public discountList = [
    {
      name: 'discout-0',
      discount: 0,
    },
    {
      name: 'discout-1',
      discount: 10,
    },
    {
      name: 'discout-2',
      discount: 20,
    },
    {
      name: 'discout-3',
      discount: 30,
    },
    {
      name: 'discout-4',
      discount: 40,
    },
  ];
  get totalprice() {
    return this.checkOutForm.get(this.controlName.totalPrice);
  }
  

  ngOnInit(): void {
    const me = this;
    me.formInit();
    me.getTotalPrice();
  }
}
