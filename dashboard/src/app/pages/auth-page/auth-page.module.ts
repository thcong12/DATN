import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';

const declarations= [AuthPageComponent,AuthLoginComponent];
const imports = [SharedModule,CommonModule, AuthPageRoutingModule];

@NgModule({
  declarations: [...declarations ],
  imports: [...imports],
  exports: [...declarations, ...imports],

})
export class AuthPageModule {}

