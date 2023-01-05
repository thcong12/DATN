import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public options:any =[
    {
      title:'profile',
      router:'/home'
    },
    {
      title:'profile',
      router:'/home'
    },
    {
      title:'profile',
      router:'/home'
    },
    {
      title:'Logout',
      router:'/home'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
