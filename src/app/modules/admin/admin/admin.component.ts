import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public pages: SelectItem[] = [];

  constructor(private router: Router) {
    this.pages.push({label: 'Компании', value: 'companies'});
    this.pages.push({label: 'Пользователи', value: 'users'});
  }

  /**
   * TODO: в текущем табе отсутствуют события
   * нельзя отслеживать изменение вкладки (вроде как)
   * разобраться или заменить другим компонентом с событиями
   */
  ngOnInit() {
  }

  public onChange(event: any) {
    this.router.navigate(['/admin/', event.value]);
  }
}
