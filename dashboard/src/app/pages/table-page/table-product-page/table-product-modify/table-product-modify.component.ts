import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, mergeMap, takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-table-product-modify',
  templateUrl: './table-product-modify.component.html',
  styleUrls: ['./table-product-modify.component.scss'],
})
export class TableProductModifyComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prodSv: ProductsService,
    private devSv: DevelopersService,
    private cateSv: CategloryService
  ) {
    super();
  }
  public productInfo!: Product.Product;

  private idProduct!: string;
  private getProduct(): void {
    const me = this;
    me.route.paramMap.subscribe((prama) => {
      let idpr = String(prama.get('id'));
      me.idProduct = String(prama.get('id'));
      forkJoin({
        product: me.prodSv.getProduct(idpr),
        detail: me.prodSv.getProductDetail(idpr),
      })
        .pipe(
          tap(({ product }) => {
            me.productInfo = { ...product };
          }),
          mergeMap(({ detail }) =>
            forkJoin({
              developer: me.devSv.getDeveloper(String(detail.developer)),
              categlory: forkJoin(
                detail.categlory.map((item) => {
                  return me.cateSv.getCateglory(String(item));
                })
              ),
            }).pipe(
              map(({ developer, categlory, }) => {
                me.productInfo.detail = {
                  ...detail,
                  developer: developer,
                  categlory: categlory,
          
                };
              })
            )
          )
        )
        .subscribe();
    });
  }
  public updateProductInfo(item: Product.Product) {
    const me = this;
    console.log(item);
    me.prodSv
      .putProduct(me.idProduct, item)
      .pipe(takeUntil(me.destroy$))
      .subscribe({
        complete: () => {
          alert('Product have change');
          console.log(me.productInfo);
        },
      });
  }
  public updateProductDetail(item: Product.Detail) {
    const me = this;
      me.prodSv
        .putProductDetail(me.idProduct, item)
        .pipe(takeUntil(me.destroy$))
        .subscribe({
          complete: () => {
            alert('Product have change');
            console.log(me.productInfo);
          },
        });
    me.router.navigate(['table/product']);
  }

  ngOnInit(): void {
    const me = this;
    me.getProduct();
  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
