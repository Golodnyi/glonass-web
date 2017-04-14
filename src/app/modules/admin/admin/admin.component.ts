import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    public items: MenuItem[];
    public activeItem: MenuItem;

    constructor(private router: Router) {
    }

    /**
     * TODO: в текущем табе отсутствуют события
     * нельзя отслеживать изменение вкладки (вроде как)
     * разобраться или заменить другим компонентом с событиями
     */
    ngOnInit() {
        this.items = [
            {label: 'Компании'},
            {label: 'Доступ'},
            {label: 'Пользователи'},
        ];
        this.activeItem = this.items[0];
        this.router.navigate(['/admin/companies']);
    }

    public onSelect(event: any) {
    }
}
