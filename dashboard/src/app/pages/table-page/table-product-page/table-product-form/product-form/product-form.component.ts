import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/model/products.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public productInfoForm!: FormGroup;

  public controlProduct = {
    productName: 'productName',
    shortDescription: 'shortDescription',
    price: 'price',
    salePersent: 'salePersent',
    saleStartDay: 'startDay',
    saleEndDay: 'endDay',
    imgX: 'imgX',
    imgY: 'imgY',
    isActive: 'isActive',
  };
  @Input() set productInfo(data: Product.Product) {
    const me = this;
    if (data) {
      me.initFormInfo();
      me.productInfoForm.patchValue({
        ...data,
        [me.controlProduct.imgX]: data?.imgX.url,
        [me.controlProduct.imgY]: data?.imgY.url,
        [me.controlProduct.salePersent]: data?.sale.salePersent,
        [me.controlProduct.saleEndDay]: new Date(String(data?.sale.endDay)),
        [me.controlProduct.saleStartDay]: new Date(String(data?.sale.startDay)),
      });
    }
  }
  @Output() productInfoChange = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {}
  private initFormInfo(): void {
    const me = this;
    me.productInfoForm = me.formBuilder.group({
      //product form
      [me.controlProduct.productName]: ['', Validators.required],
      [me.controlProduct.price]: [0, Validators.required],
      [me.controlProduct.salePersent]: [0, Validators.required],
      [me.controlProduct.saleStartDay]: ['', Validators.required],
      [me.controlProduct.saleEndDay]: ['', Validators.required],
      [me.controlProduct.shortDescription]: ['', Validators.required],
      [me.controlProduct.imgX]: ['', Validators.required],
      [me.controlProduct.imgY]: ['', Validators.required],
      [me.controlProduct.isActive]: ['', Validators.required],
      //product detail form
    });
  }
  public changeProductInfo() {
    const me = this;
    me.productInfoChange.emit(me.productInfoForm.value);
  }
  ngOnInit(): void {
    const me = this;
    me.initFormInfo();
  }
}
