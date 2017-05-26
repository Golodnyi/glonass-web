import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  companiesActions: MenuItem[] = [];
  usersActions: MenuItem[] = [];
  rolesActions: MenuItem[] = [];

  constructor(private router: Router) {
    this.companiesActions = [
      {
        label: 'Создать компанию', command: () => {
        this.router.navigate(['/admin/companies/company/create']);
      }
      },
      {
        label: 'Создать подразделение', command: () => {
        this.router.navigate(['/admin/companies/subdivision/create']);
      }
      }
    ];

    this.usersActions = [
      {
        label: 'Создать пользователя', command: () => {
        this.router.navigate(['/admin/users/user/create']);
      }
      }
    ];

    this.rolesActions = [
      {
        label: 'Создать роль', command: () => {
      }
      }
    ];
  }

  ngOnInit() {
  }

  public company() {
    this.router.navigate(['/admin/companies']);
  }

  public users() {
    this.router.navigate(['/admin/users']);
  }

  public roles() {
    this.router.navigate(['/admin/roles']);
  }
}
