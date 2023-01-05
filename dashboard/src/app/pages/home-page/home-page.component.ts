import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, mergeMap, switchMap, tap } from 'rxjs';
import { ProductsService } from 'src/app/shared/service/products.service';
import { ReportService } from 'src/app/shared/service/report.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public element!: any;
  public bestSeller!: any;
  public listProduct!:any;
  constructor(private reportSv: ReportService,private productSv:ProductsService) {}
  public getAmount() {
    const me = this;
    forkJoin({
      besseller: me.reportSv.reportBestSeller(),
      amount: me.reportSv.getAmount(),
      productList:me.productSv.getProducts()
    })
      .pipe(
        tap(({ besseller, amount,productList}) => {
          me.element = amount;
          me.bestSeller = [...(besseller as any)];
          me.listProduct = [... productList.slice(0,10)]
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    const me = this;
    me.getAmount();
  }
}
