import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { CategloryPageRoutingModule } from './categlory-page-routing.module';
import { CategloryPageComponent } from './categlory-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { CategloryDetailPageComponent } from './categlory-detail-page/categlory-detail-page.component';



const declarations: any[] = [
  CategloryPageComponent, 
  CategloryDetailPageComponent,
];
const imports = [
  CommonModule,
  SharedModule,
  HttpClientModule,
  CategloryPageRoutingModule,
  
];

@NgModule({
  declarations: [...declarations,],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class CategloryPageModule { }
