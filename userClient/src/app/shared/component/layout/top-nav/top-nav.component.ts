import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/model/account.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  public userInfo = new BehaviorSubject<any>({})
  public isDropdown:boolean = false;
  public pageMenu: any = [
    {
      name: 'Home',
      href: '/home',
    },
    {
      name: 'Game',
      href: '/products',
    },
    {
      name: 'News',
      href: '/news',
    },
    {
      name: 'About Us',
      href: '/aboutus',
    },

    {
      name: 'Contact',
      href: '/contact',
    },
  ];
  public option: any = [
    {
      value: 'user/profie',
      display: 'Your profie',
    },
    {
      value: 'user/whislist',
      display: 'Your whislist',
    },
    {
      value: 'user/logout',
      display: 'Your whislist',
    },
  ];
  constructor(private authsv: AuthService) {}
  public searchPageToggle(): void {}
  public logout() {
    this.authsv.logout().subscribe();
  }
  public check() {
    this.isDropdown = !this.isDropdown
    
  }

  ngOnInit(): void {
    const me = this;
    if(me.isLogin$){
        me.userInfo.next(JSON.parse(String(localStorage.getItem('userDetail'))))
    }

  }
  public navMenuToggle(): void {}
}
