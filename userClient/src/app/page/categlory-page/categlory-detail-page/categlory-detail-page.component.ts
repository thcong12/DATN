import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { forkJoin, mergeMap, tap } from 'rxjs';
import { Product } from 'src/app/shared/model/products.model';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-categlory-detail-page',
  templateUrl: './categlory-detail-page.component.html',
  styleUrls: ['./categlory-detail-page.component.scss'],
})
export class CategloryDetailPageComponent implements OnInit {
  public listProduct!: Product.Product[]
  public counter:number = 0;
  public cateName!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cateSv: CategloryService,
    private productSv: ProductsService
  ) {}
  private getProductOfCateglory() {
    const me = this;
    me.route.paramMap
      .pipe(
        mergeMap((res) =>
          me.cateSv.getProductByCateglory(String(res.get('name'))).pipe(
            mergeMap((data) =>
              forkJoin(
                data.map((item) => {
                  return me.productSv.getProduct(item.productId);
                })
              ).pipe(
                tap((result) => {
                  me.listProduct = result;
                  me.listProduct.map((pr, index) => {
                    pr.detail = data[index]
                  });
                  console.log(me.listProduct)
                  me.cateName = String(res.get('name')).toUpperCase();
                })
              )
            )
          )
        )
      )
      .subscribe();
  }
  onNext() {
    if (this.counter != this.listProduct.length - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  
  ngOnInit(): void {
    const me = this;
    me.getProductOfCateglory();
    console.log('asdasd');
  }
}
