import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';
import { DiscountsService } from 'src/app/shared/service/discounts.service';

@Component({
  selector: 'app-table-product-form',
  templateUrl: './table-product-form.component.html',
  styleUrls: ['./table-product-form.component.scss'],
  providers: [MessageService],
})
export class TableProductFormComponent extends BaseComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private devSv: DevelopersService,
    private disSv: DiscountsService,
    private cateSv: CategloryService,
  ) {
    super();
  }
  @Output() productFormData = new EventEmitter<Product.Product>();
  @Output() productFormDataDetail = new EventEmitter<Product.Detail>();
  @Input() productInfo: Product.Product = {} as Product.Product;
  @Input() isNewProduct!: boolean
  public categlorys!: Product.Categlory[];
  public developers!: Product.Developer[];
  public imgForm!: FormGroup;
  public displayModalCategolry!: boolean;
  public displayModdalFeature!: boolean;
  public showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
  public showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Message Content',
    });
  }
  public formatData(data: any) {
    const me = this;
    let dataAfterFormat: Product.Product = {
      ...data,
      imgX: {
        url: data.imgX,
        title: 'anh doc',
      },
      imgY: {
        url: data.imgY,
        title: 'anh ngang',
      },
      sale: {
        salePersent: data.salePersent,
        startDay: data.startDay,
        endDay: data.endDay,
      },
    };
    me.productFormData.emit(dataAfterFormat);
  }
  public formatDetailData(data: Product.Detail) {
    const me = this;
    me.productFormDataDetail.emit(data);
  }

  
  private getData() {
    const me = this;
    forkJoin({
      categlory: me.cateSv.getCateglorys(),
      developer: me.devSv.getDevelopers(),
    })
      .pipe(
        tap(({ categlory, developer }) => {
          me.categlorys = [...(categlory as Product.Categlory[])];
          me.developers = [...(developer as Product.Developer[])];
        })
      )
      .subscribe(
        
      );
  }

  ngOnInit(): void {
    const me = this;
    me.getData()
  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
