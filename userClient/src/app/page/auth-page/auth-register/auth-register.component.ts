import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public controlRegister = {
    userName: 'userName',
    email: 'email',
    password: 'password',
    repassword:'repassword',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
  };
 
  constructor(private formBd:FormBuilder,private authSv:AuthService) { }

  private formInit(){
    const me = this;
    me.registerForm = me.formBd.group({
      [me.controlRegister.userName]: ['', Validators.required],
      [me.controlRegister.email]: ['', Validators.required],
      [me.controlRegister.password]: ['', Validators.required],
      [me.controlRegister.fullName]: ['', Validators.required],
      [me.controlRegister.phoneNumber]: ['', Validators.required],
    });
  }
  get userFullName(){
    return this.registerForm.get(this.controlRegister.fullName)?.value;
  }
  public registerSubmit(){
    const me = this;
    me.authSv.register(me.registerForm.value).pipe(
      
    ).subscribe()
  }
  ngOnInit(): void {
    const me = this
    me.formInit()
  }



}
