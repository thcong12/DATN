import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, forkJoin, tap, BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { User } from 'src/app/shared/model/account.model';
import { Product } from 'src/app/shared/model/products.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';
import { FeatureService } from 'src/app/shared/service/feature.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent
  extends BaseComponent
  implements OnInit
{
  public commentForm!: FormGroup;
  counter: number = 0;
  public isLogin$: BehaviorSubject<boolean> = this.authSv.isLogin;
  public isInLybrary: boolean = false;
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prodSv: ProductsService,
    private devSv: DevelopersService,
    private feaSv: FeatureService,
    private cateSv: CategloryService,
    private userSv: UserService,
    private formBd: FormBuilder,
    private storeSv: StoreService,
    private authSv: AuthService
  ) {
    super();
  }
  public responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  public selectedIndex: number = 0;
  public product!: any;
  public listProductSimilar!: any[];
  public developerId!: any;
  public productId!: string;
  id: string = 'info';
  color: string = '';
  public display(ids: any) {
    this.id = ids;
    this.color = 'blue';
  }
  public controlName = {
    title: 'title',
    rating: 'rating',
    comment: 'comment',
  };
  private getProduct(): void {
    const me = this;
    me.route.paramMap
      .pipe(
        mergeMap((param) =>
          me.prodSv.getProductDetail(String(param.get('id'))).pipe(
            tap((res: any) => {
              let aaa = '';
              me.product = res;
              me.productId = String(param.get('id'));
              me.developerId = res.productDetail.developer._id;
              res.productDetail.categlory.slice(0, 3).map((item: any) => {
                aaa += `${item._id}+`;
              });
              me.storeSv.findSameProduct(aaa).pipe(
                tap((res) => {
                  me.listProductSimilar = [...(res as any)];
                  console.log(res);
                })
              ).subscribe();
                console.log(res.productDetail.description)
            }),
           
          
          )
        )
      )
      .subscribe();
  }
  private getSameProduct(id: string) {
    const me = this;
    me.storeSv
      .findSameProduct(id)
      .pipe(
        tap((res) => {
          me.listProductSimilar = [...(res as any)];
          console.log(res);
        })
      )
      .subscribe();
  }
  public postComment() {
    const me = this;
    me.userSv.postComment(me.productId, me.commentForm.value).subscribe();
  }
  public getLibraries() {
    const me = this;
    me.userSv
      .getLibraries()
      .pipe(
        tap((res) => {
          res.map((item: any) => {
            if (item._id == me.productId) {
              me.isInLybrary = true;
            }
          });
        })
      )
      .subscribe();
  }
  public addToCart(item: Product.Product) {
    const me = this;
    let dataFormat: User.CartDetail = {
      product: item,
      quantity: 1,
    };
    this.userSv.cartList.subscribe((data) => {
      const aa = data.map((item) => {
        return item.product._id;
      });
      if (aa.includes(dataFormat.product._id)) {
        alert('product had been in your cart');
      } else {
        me.userSv.addToCart(dataFormat).subscribe({
          complete: () => {
            data.push(dataFormat);
          },
        });
      }
    });
  }
  public addToWishList(item:string){
      const me = this;
      me.userSv.addToWishList(item).pipe().subscribe()
  }
  private formInit() {
    const me = this;
    me.commentForm = me.formBd.group({
      [me.controlName.title]: ['', Validators.required],
      [me.controlName.rating]: ['', Validators.required],
      [me.controlName.comment]: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const me = this;
    me.getProduct();

    me.formInit();
    me.isLogin$.subscribe((result) => {
      if (result) {
        me.getLibraries();
        setTimeout(() => {
          me.userSv.setDataRecomend(me.productId).subscribe();
        }, 2000);
      }
    });
  }
  onNext() {
    if (this.counter != this.listProductSimilar.length - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
}
