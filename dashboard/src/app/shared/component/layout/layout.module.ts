import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from '../../shared.module';
import { LayoutComponent } from './layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
const declarations: any[] = [
  LayoutComponent,
  SideNavComponent,
  TopNavComponent,
];
const imports = [
  CommonModule,
  SharedModule,
  TieredMenuModule,
  ButtonModule,
  TabViewModule,
  DropdownModule
];
@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class LayoutModule {}
