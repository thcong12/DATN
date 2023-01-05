import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountPageRoutingModule } from './account-page-routing.module';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { AccountAdminFormComponent } from './account-admin/account-admin-form/account-admin-form.component';
import { AccountAdminCreateComponent } from './account-admin/account-admin-create/account-admin-create.component';
import { AccountAdminModifyComponent } from './account-admin/account-admin-modify/account-admin-modify.component';
import { AccountUserComponent } from './account-user/account-user.component';
import { AccountUserModifyComponent } from './account-user/account-user-modify/account-user-modify.component';
import { AccountUserCreateComponent } from './account-user/account-user-create/account-user-create.component';
import { AccountUserFormComponent } from './account-user/account-user-form/account-user-form.component';
import { AccountPageComponent } from './account-page.component';

const declarations = [
  AccountAdminComponent,
  AccountAdminFormComponent,
  AccountAdminCreateComponent,
  AccountAdminModifyComponent,
  AccountUserComponent,
  AccountUserModifyComponent,
  AccountUserCreateComponent,
  AccountUserFormComponent,
  AccountPageComponent
];
const imports = [SharedModule, CommonModule, AccountPageRoutingModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
})
export class AccountPageModule {}
