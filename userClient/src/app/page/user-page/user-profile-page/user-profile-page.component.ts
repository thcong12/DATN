import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, tap, forkJoin } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';
declare const paypal: any;
@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  public userDetail!: any;
  public userLibraries!: any;
  public userOrder!: any;
  public userWishList!: any;
  public selectedIndex = 0;
  public displayOrder = false;
  public orderDetail!: any;
  public totalPrice: number = 0;
  public listLink: any = [
    {
      id: 1,
      content: 'Your library',
    },
    {
      id: 2,
      content: 'Your order',
    },
    {
      id: 3,
      content: 'Your wishlist',
    },
  ];
  public id = 2;
  @ViewChild('paypal')
  paypalElement!: ElementRef;
  constructor(private userSv: UserService) {}
  public getData() {
    const me = this;
    forkJoin({
      libraries: me.userSv.getLibraries(),
      order: me.userSv.getOrderUser(),
      wishlist: me.userSv.getWishlist(),
    }).pipe(tap(({ libraries, order, wishlist }) => {
      me.userOrder = [...order as any];
      me.userLibraries = [...libraries as any];
      me.userWishList = [...wishlist as any]
    })).subscribe();
  }
  public display(id: any) {
    this.selectedIndex = 0;
    this.id = id;
  }
  public displayOrderDetail(id: string) {
    const me = this;
    me.displayOrder = true;
    me.userSv
      .getOrderDetail(id)
      .pipe(
        tap((res: any) => {
          let totalPrice = 0;
          res.orderItem.map((item: any) => {
            totalPrice +=
              item.price - (item.price * item.sale.salePersent) / 100;
          });
          me.orderDetail = { ...res };
          Object.assign(me.orderDetail, { total: totalPrice });
        })
      )
      .subscribe((x) => {
        console.log(x);
      });
  }
  // private paypalPayment() {
  //   const me = this;
  //   paypal
  //     .Buttons({
  //       createOrder: (data: any, actions: any) => {
  //         me.userSv.getOrderDetail({...me.order.value,orderItem:me.userCart.cartDetail}).subscribe(x=>{
  //           me.orderId = x._id
  //         })
  //         return actions.order.create({
  //           purchase_units: [
  //             {
  //               amount: {
  //                 currency_code: 'USD',
  //                 value: me.order.value.totalPrice as String,
  //               },
  //             },
  //           ],
  //         });
  //       },

  //       onApprove: async (data: any, actions: any) => {
  //         const payment = await actions.order.capture();
  //         me.orderSv.paid(me.cartId,me.orderId,me.order.value).subscribe(
  //           {
  //             next: (orderId) => {
  //              alert("payment success")
  //             },
  //           }
  //         );
  //       },

  //       onError: (err: any) => {
  //         console.log(err);
  //       },
  //     })
  //     .render(me.paypalElement.nativeElement);
  // }

  ngOnInit(): void {
    const me = this;
    me.getData();
    me.userDetail = JSON.parse(String(localStorage.getItem('userDetail')));
  }
}
