import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAdminCreateComponent } from './account-admin/account-admin-create/account-admin-create.component';
import { AccountAdminModifyComponent } from './account-admin/account-admin-modify/account-admin-modify.component';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { AccountUserCreateComponent } from './account-user/account-user-create/account-user-create.component';
import { AccountUserModifyComponent } from './account-user/account-user-modify/account-user-modify.component';
import { AccountUserComponent } from './account-user/account-user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AccountAdminComponent,
    children: [
      {
        path: 'create',
        component: AccountAdminCreateComponent,
      },
      {
        path: 'id',
        component: AccountAdminModifyComponent,
      },
    ],
  },
  {
    path: 'user',
    component: AccountUserComponent,
    children: [
      {
        path: 'create',
        component: AccountUserCreateComponent,
      },
      {
        path: 'id',
        component: AccountUserModifyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
