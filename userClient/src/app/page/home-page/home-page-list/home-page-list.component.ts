import { Component, OnInit } from '@angular/core';
import { forkJoin, map, mergeMap, tap } from 'rxjs';
import { Product, Store } from 'src/app/shared/model/products.model';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';
import { FeatureService } from 'src/app/shared/service/feature.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
} from '@angular/animations';
import { StoreService } from 'src/app/shared/service/store.service';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];
@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class HomePageListComponent implements OnInit {
  counter: number = 0;
  public releaseseProducts = [] as any;
  public topSellerProducts = [] as any;
  public recommendProducts!: Product.Product[];
  public selectedIndex = 0;
  public listLink: any = [
    {
      id: '1',
      content: 'New update',
      products: [] as any,
    },
    {
      id: '2',
      content: 'Top seller',
      products: [] as any,
    },
    {
      id: '3',
      content: 'Recommend',
      products: [] as any,
    },
  ];
  public id = '1';
  constructor(
    private productSv: ProductsService,
    private devSv: DevelopersService,
    private cateSv: CategloryService,
    private feaSv: FeatureService,
    private storeSv: StoreService
  ) {}

  public display(id: any) {
    this.selectedIndex = 0;
    this.id = id;
  }
  public async getData() {
    const me = this;
    me.productSv
      .getProducts()
      .pipe(
        map((releasese) => {
          let newArray = releasese.slice(0, 10);
          newArray.map((item: any) => {
            let idPr = String(item._id);
            return me.productSv
              .getProductDetail(idPr)
              .pipe(
                tap((res) => {
                  me.releaseseProducts.push(res);
                })
              )
              .subscribe();
          });
        })
      )
      .subscribe({
        complete: () => {
          me.listLink[0].products = me.releaseseProducts;
          console.log(me.listLink[0]);
          console.log(me.releaseseProducts);
        },
      });
  }
  public getData1() {
    const me = this;
    me.storeSv
      .getBestSeller()
      .pipe(
        tap((bestseller) => {
          bestseller.slice(0, 10).map((item) => {
            let id1 = String(item._id);
            return me.productSv
              .getProductDetail(id1)
              .pipe(
                tap((res) => {
                  me.topSellerProducts.push(res);
                })
              )
              .subscribe({
                complete: () => {},
              });
          });
        })
      )
      .subscribe({
        complete: () => {
          me.listLink[1].products = me.topSellerProducts;
          console.log(me.listLink[1]);
          console.log(me.topSellerProducts);
        },
      });
  }
  public slideShow(index: number) {
    this.selectedIndex = index;
  }
  ngOnInit(): void {
    const me = this;
    me.getData();
    me.getData1();
  }
  onNext(productList: any) {
    if (this.counter != productList - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
}
