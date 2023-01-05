import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategloryDetailPageComponent } from './categlory-detail-page/categlory-detail-page.component';

import { CategloryPageComponent } from './categlory-page.component';

const routes: Routes = [
  {
    path:'',
    component:CategloryPageComponent
  },
  {
    path:':name',
    component:CategloryDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategloryPageRoutingModule {}
