import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AccountAdminService } from 'src/app/shared/service/account-admin.service';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss']
})
export class AccountUserComponent implements OnInit {
  public accountUserList!:any
  constructor(private accSv:AccountAdminService) { }
  public getData(){
    const me  = this;
    me.accSv.accountUser().pipe(tap(res =>{
      me.accountUserList = res
    })).subscribe()
  }
  ngOnInit(): void {
    const me =this
    me.getData()
  }

}
