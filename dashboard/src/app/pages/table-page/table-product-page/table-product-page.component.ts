import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, map } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-table-product-page',
  templateUrl: './table-product-page.component.html',
  styleUrls: ['./table-product-page.component.scss'],
})
export class TableProductPageComponent extends BaseComponent implements OnInit {
  public products!: Product.Product[];
  public isNewProduct!:boolean;
  public option!: string[];
  public select!: string;
  private getProducts() {
    const me = this;
    return me.productsv
      .getProducts()
      .pipe(
        takeUntil(me.destroy$),
        map((data: Product.Product[]) => {
          me.products = [...data];
        })
      )
      .subscribe();
  }
  public getProduct(id: String) {
    const me = this;
    me.router.navigate(['table/product/detail', id]);
  }
  public newProduct() {
    const me = this;
    me.isNewProduct = true;
    me.router.navigate(['table/product/create']);
  }
  constructor(private router: Router, private productsv: ProductsService ) {
    super();
  }
  ngOnInit(): void {
    const me  = this;
    me.getProducts();
  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
