import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public formLogin!:FormGroup;
  constructor(private formBd:FormBuilder,private authSv:AuthService,private router:Router) { }
  public controlName = {
    userName:"userName",
    password:"password"
  }
  private formInit() {
    const me = this;
    me.formLogin = me.formBd.group({
      [me.controlName.userName]:['',Validators.required],
      [me.controlName.password]:['',Validators.required]
    })
  }
  public submitLogin(){
    const me = this
    me.authSv.login(me.formLogin.value).pipe(
      tap(res =>{
        alert(`welcome back ${res.body.adminDetail.userName}`)
        me.router.navigate(['/home'])
      }),
      catchError((err:HttpErrorResponse)=>{
        if (err.error instanceof Error) {
          console.error('An error occurred:', err.error.message);
        } else {
          alert('Some thing wrong')
        }
        return EMPTY;
      })
    ).subscribe()
  }
  ngOnInit(): void {
    const me = this;
    me.formInit();
  }

}
