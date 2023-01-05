import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, mergeMap, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent extends BaseComponent implements OnInit {
  onDestroy(): void {}
  public isLogin$: BehaviorSubject<boolean> = this.authSv.isLogin;
  public formLogin!: FormGroup;
  public formChangePassword!: FormGroup;
  public display: boolean = false;

  public showDialog() {
    this.display = true;
  }
  constructor(
    private formBd: FormBuilder,
    private authSv: AuthService,
    private userSv: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }
  public controlLogin = {
    userName: 'userName',
    password: 'password',
  };
  public controlChangePassword = {
    userName: 'userName',
    email: 'email',
  };
  private formInit() {
    const me = this;
    me.formLogin = me.formBd.group({
      [me.controlLogin.userName]: ['', Validators.required],
      [me.controlLogin.password]: ['', Validators.required],
    });
    me.formChangePassword = me.formBd.group({
      [me.controlChangePassword.userName]: ['', Validators.required],
      [me.controlChangePassword.email]: ['', Validators.required],
    });
  }
  public loginSubmit() {
    const me = this;
    me.authSv
      .login(me.formLogin.value)
      .pipe(
        tap(() => {
          me.router.navigateByUrl('/home');
        })
      )
      .subscribe({
        complete: () => {
          me.userSv.getReCommendProduct().subscribe((res) => {
            localStorage.setItem('recommendProduct',String(JSON.stringify(res)))
          });
        },
      });
  }
  public changePasswordSubmit() {
    const me = this;
    me.authSv
      .forgotPassword(me.formChangePassword.value)
      .pipe(
        tap((res) => {
          alert('Please check your email');
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    const me = this;
    me.formInit();
    me.route.paramMap;
  }
}
