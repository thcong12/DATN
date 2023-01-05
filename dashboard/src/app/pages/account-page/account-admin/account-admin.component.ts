import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, map, mergeMap, pipe, tap } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';
import { AccountAdminService } from 'src/app/shared/service/account-admin.service';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.scss'],
})
export class AccountAdminComponent implements OnInit {
  public accountAdmins!: Account.Admin[];
  public option!: string[];
  public select!: string;
  constructor(private adminSv: AccountAdminService) {}
  private getAccountAdmins() {
    const me = this;
    me.adminSv
      .accountAdminList()
      .pipe(
        tap((res) => {
          res.map((item) => {
            return me.adminSv
              .typeAdminDetail(String(item.typeAdmin))
              .subscribe((x) => {
                item.typeAdmin = x;
              });
          });
          me.accountAdmins = [...res];
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    const me = this;
    me.getAccountAdmins();
  }
}
