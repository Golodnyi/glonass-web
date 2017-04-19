import {Component, OnInit} from '@angular/core';
import {Company} from '../../../../../models/Company';
import {MsgService} from '../../../../../services/msg';
import {AuthService} from '../../../../../services/auth.service';
import {CompaniesService} from "../../../../../services/companies.service";

@Component({
    selector: 'app-company-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CompanyCreateComponent implements OnInit {

    public company: Company = new Company();
    public ru: any;

    constructor(private authService: AuthService, private msg: MsgService, private companiesService: CompaniesService) {
        this.company.active_till = new Date();
        this.company.active_till.setMonth(this.company.active_till.getMonth() + 12);
    }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(
            user => {
                this.company.author = user;
            }
        );
        this.ru = {
            firstDayOfWeek: 0,
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        };
    }

    public create() {
        if (this.company.name === null) {
            this.msg.notice(MsgService.ERROR, 'Заполинте все поля', 'Заполните название компании');
            return false;
        }
        this.companiesService.create(this.company).subscribe(
            company => {
                this.company = company;
                this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Компания ' + this.company.name + ' создана');
            },
            error => {
                this.msg.notice(MsgService.ERROR, 'Ошибка', error);
            }
        );
    }
}
