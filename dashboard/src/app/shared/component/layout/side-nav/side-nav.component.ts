import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public items!: MenuItem[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-fw pi-home fs-4 m-0 py-2',
        routerLink: 'home',
      },
      {
        icon: 'pi pi-fw pi-folder fs-4  m-0 py-2',
        items: [
          {
            label: 'Categlory',
            icon: 'bi bi-grid',
            routerLink: 'table/categlory',
          },
          {
            label: 'Developer',
            icon: 'bi bi-person-workspace',
            routerLink: 'table/developer',
          },
          {
            label: 'Product',
            icon: 'bi bi-controller',
            routerLink: 'table/product',
          },
        ],
      },
      {
        icon: 'pi pi-fw pi-user fs-4 m-0 py-2',
        items: [
          {
            label: 'Admin',
            icon: 'bi bi-people-fill',
            routerLink: 'accounts/admin',
          },
          {
            label: 'Users',
            icon: 'bi bi-people',
            routerLink: 'accounts/user',
          },
        ],
      },
      {
        icon: 'pi pi-fw pi-calendar fs-4 m-0 py-2',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
    ];
  }
}
