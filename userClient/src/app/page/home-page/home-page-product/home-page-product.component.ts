import { Component, OnInit } from '@angular/core';
import { forkJoin, map, tap } from 'rxjs';
import { Product, Store } from 'src/app/shared/model/products.model';
import { ProductsService } from 'src/app/shared/service/products.service';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { User } from 'src/app/shared/model/account.model';
import { UserService } from 'src/app/shared/service/user.service';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'app-home-page-product',
  templateUrl: './home-page-product.component.html',
  styleUrls: ['./home-page-product.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ]
})
export class HomePageProductComponent implements OnInit {
  counter: number = 0;
  public productList!: Product.Product[];
  constructor(private productSv: ProductsService,private userSv:UserService) {}
  public getData() {
    const me = this;
    me.productSv
      .getProducts()
      .pipe(
        tap((res) => {
          res.map((item: Product.Product) => {
            forkJoin({ detail: me.productSv.getProductDetail(item._id) })
              .pipe(
                map(({ detail }) => {
                  item.detail = detail
                })
              )
              .subscribe();
          });
          me.productList = [...res];
        })
      )
      .subscribe();
  }


  ngOnInit(): void {
    const me = this;
    me.getData();
  }
  onNext() {
    if (this.counter != this.productList.length - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
}
