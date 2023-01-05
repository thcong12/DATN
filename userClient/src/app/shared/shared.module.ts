import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomNavComponent } from './component/layout/bottom-nav/bottom-nav.component';
import { TopNavComponent } from './component/layout/top-nav/top-nav.component';
import { SideNavComponent } from './component/layout/side-nav/side-nav.component';
import { LayoutComponent } from './component/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { CartNavComponent } from './component/layout/cart-nav/cart-nav.component';
import { LoaderComponent } from './component/loader/loader.component';
import { RouterModule } from '@angular/router';
import { SortPipe } from './pipe/sort.pipe';
import { SearchProductPipe } from './pipe/search-product.pipe';


const declarations: any[] = [
  LayoutComponent,
  BottomNavComponent,
  TopNavComponent,
  SideNavComponent,
  CartNavComponent,
  LoaderComponent,
  SortPipe,
  SearchProductPipe,
];
const imports = [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule,RouterModule];

@NgModule({
  declarations: [...declarations, ],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class SharedModule {}
