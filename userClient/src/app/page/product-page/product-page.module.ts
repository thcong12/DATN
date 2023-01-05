import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import {PaginatorModule} from 'primeng/paginator';
import {GalleriaModule} from 'primeng/galleria';

const declarations: any[] = [ProductPageComponent, ProductDetailPageComponent];
const imports = [
  CommonModule,
  SharedModule,
  HttpClientModule,
  ProductPageRoutingModule,
  DataViewModule,
  DropdownModule,
  TabViewModule,
  SliderModule,
  ChipModule,
  RatingModule,
  FormsModule,
  ReactiveFormsModule,
  PaginatorModule,
  GalleriaModule
];

@NgModule({
  declarations: [...declarations,],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class ProductPageModule {}
