import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthPageComponent } from './auth-page.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthUseractiveComponent } from './auth-useractive/auth-useractive.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        component:AuthLoginComponent,
      
      },
      {
        path: 'register',
        component:AuthRegisterComponent
      },
      {
        path: 'userActice/:token',
        component:AuthUseractiveComponent
      },
      {
        path: 'changepassword/:token',
        component:AuthUseractiveComponent
      },
      {
        path: 'changepassword/:token',
        component:AuthUseractiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
