import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ProductsService } from 'src/app/shared/service/products.service';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-home-page-onsale',
  templateUrl: './home-page-onsale.component.html',
  styleUrls: ['./home-page-onsale.component.scss'],
})
export class HomePageOnsaleComponent implements OnInit {
  public data!: any;
  public idPage:number = 1;
  constructor(private storeSv: StoreService) {}
  private getData() {
    this.storeSv.getSaleProduct().pipe(
      tap((res: any) => {
        this.data = res.slice(0,20);
      })
    ).subscribe();
  }
  public setIdPage(id:number){
    this.idPage = id
  }
  ngOnInit(): void {
    this.getData()
  }
}
