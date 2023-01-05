import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { Chart1Component } from './chart1/chart1.component';
import { ElementsComponent } from './elements/elements.component';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';

const declarations = [HomePageComponent,Chart1Component, ElementsComponent];
const imports = [CommonModule,SharedModule, HomePageRoutingModule,ChartModule];
@NgModule({
  imports: [...imports],
  declarations: [...declarations],
  exports: [...declarations, ...imports],
})
export class HomePageModule {}
