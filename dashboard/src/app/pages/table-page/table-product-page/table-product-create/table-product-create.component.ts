import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';
import { DiscountsService } from 'src/app/shared/service/discounts.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-table-product-create',
  templateUrl: './table-product-create.component.html',
  styleUrls: ['./table-product-create.component.scss']
})
export class TableProductCreateComponent extends BaseComponent implements OnInit {
  public newProduct: Product.Product = {} as Product.Product;
  public createProduct(item: Product.Product) {
    const me = this;
    me.prodSv
      .createProduct(item)
      .pipe(takeUntil(me.destroy$))
      .subscribe({
        next: (_req) => {
          alert('create success')
        },

      });
    me.router.navigate(['table/product']);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prodSv: ProductsService,
    private devSv: DevelopersService,
    private disSv: DiscountsService,
    private cateSv: CategloryService
  ) {
    super();
  }

  ngOnInit(): void {
    const me = this;

  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
