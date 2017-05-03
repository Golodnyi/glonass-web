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

  constructor(private router: Router) {
    this.companiesActions = [
      {label: 'Создать компанию', command: () => {
        this.router.navigate(['/admin/companies/company/create']);
      }},
      {label: 'Создать подразделение', command: () => {
        this.router.navigate(['/admin/companies/subdivision/create']);
      }}
    ];

    this.usersActions = [
      {label: 'Создать пользователя', command: () => {
      }},
      {label: 'Создать роль', command: () => {
      }},
    ];
  }

  /**
   * TODO: в текущем табе отсутствуют события
   * нельзя отслеживать изменение вкладки (вроде как)
   * разобраться или заменить другим компонентом с событиями
   */
  ngOnInit() {
  }

  public company() {
    this.router.navigate(['/admin/companies']);
  }

  public users() {
    this.router.navigate(['/admin/users']);
  }
}
