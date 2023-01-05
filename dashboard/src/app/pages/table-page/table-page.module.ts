import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { TablePageComponent } from './table-page.component';
import { TableProductFormComponent } from './table-product-page/table-product-form/table-product-form.component';
import { TableProductCreateComponent } from './table-product-page/table-product-create/table-product-create.component';
import { TableProductModifyComponent } from './table-product-page/table-product-modify/table-product-modify.component';
import { TablePageRoutingModule } from './table-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDeveloperPageComponent } from './table-developer-page/table-developer-page.component';
import { TableCategloryPageComponent } from './table-categlory-page/table-categlory-page.component';
import { TableProductPageComponent } from './table-product-page/table-product-page.component';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import { DetailFormComponent } from './table-product-page/table-product-form/detail-form/detail-form.component';
import { ProductFormComponent } from './table-product-page/table-product-form/product-form/product-form.component';
import {EditorModule} from 'primeng/editor';
const declarations = [
  TablePageComponent,
  TableProductPageComponent,
  TableProductFormComponent,
  TableProductCreateComponent,
  TableProductModifyComponent,
  TableDeveloperPageComponent,
  TableCategloryPageComponent,
  DetailFormComponent, ProductFormComponent,
];
const imports = [
  CommonModule,
  SharedModule,
  TablePageRoutingModule,
  ChipModule,
  BadgeModule,
  ButtonModule,
  DialogModule,
  TabViewModule,
  DropdownModule,
  ImageModule,
  FormsModule, 
  ReactiveFormsModule,
  CalendarModule,
  RippleModule,
  ToastModule,
  EditorModule
];

@NgModule({
  declarations: [...declarations,],
  exports: [...declarations, ...imports],
  imports: [...imports],
  providers: [],
})
export class TablePageModule {}
