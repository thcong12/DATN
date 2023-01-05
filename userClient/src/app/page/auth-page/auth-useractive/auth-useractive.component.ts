import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-auth-useractive',
  templateUrl: './auth-useractive.component.html',
  styleUrls: ['./auth-useractive.component.scss'],
})
export class AuthUseractiveComponent implements OnInit {
  constructor(
    private authSv: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  private userActive() {
    const me = this;
    me.route.paramMap.subscribe((pram) => {
      let userId = String(pram.get('token'));
      me.authSv
        .userActive(userId)
        .pipe()
        .subscribe({
          complete: () => {
            me.router.navigateByUrl('/home');
          },
        });
    });
  }
  ngOnInit(): void {
    const me = this;
    me.userActive();
  }
}
