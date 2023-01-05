import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { NewsPageComponent } from './news-page.component';
import { NewsPageRoutingModule } from './news-page-routing.module';
import { NewsDetailComponent } from './news-detail/news-detail.component';


const declarations: any[] = [
NewsPageComponent,
NewsDetailComponent
];
const imports = [
  CommonModule,
  SharedModule,
  HttpClientModule,
NewsPageRoutingModule

];

@NgModule({
  declarations: [...declarations,],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class NewsPageModule { }
