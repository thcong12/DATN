import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableCategloryPageComponent } from './table-categlory-page/table-categlory-page.component';
import { TableDeveloperPageComponent } from './table-developer-page/table-developer-page.component';
import { TablePageComponent } from './table-page.component';
import { TableProductCreateComponent } from './table-product-page/table-product-create/table-product-create.component';
import { TableProductModifyComponent } from './table-product-page/table-product-modify/table-product-modify.component';
import { TableProductPageComponent } from './table-product-page/table-product-page.component';

const routes: Routes = [
  {
    path: 'product',
    component: TablePageComponent,
    children: [
      {
        path: '',
        component: TableProductPageComponent,
      },
      {
        path: 'detail/:id',
        component: TableProductModifyComponent,
      },
      {
        path: 'create',
        component: TableProductCreateComponent,
      },
    ],
  },
  {
    path: 'categlory',
    component: TableCategloryPageComponent,
  },
  {
    path: 'developer',
    component: TableDeveloperPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}
