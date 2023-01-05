import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public isLogin!:boolean
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    const me = this;
    me.isLogin = me.auth.isLogin;
  }

}
