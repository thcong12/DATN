import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, mergeMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public isLogin$: BehaviorSubject<boolean> = this.authSv.isLogin;
  public recomendProduct = new BehaviorSubject<any>([]);
  constructor(
    private authSv: AuthService,
    private productSv: ProductsService
  ) {}
  public getData() {
    const me = this;
    const productArray = JSON.parse(
      String(localStorage.getItem('recommendProduct'))
    );
    console.log(productArray)
    forkJoin(
      productArray.buy.map((item: any) => {
        return me.productSv.getProductDetail(item);
      })
    ).pipe(tap((res: any) => {
      me.recomendProduct.next(res)
      console.log(res)
      console.log(me.recomendProduct)
    }
    )).subscribe();
  }
  ngOnInit(): void {
    const me = this;
    if(me.isLogin$){
        me.getData()
    }  
  }
}
