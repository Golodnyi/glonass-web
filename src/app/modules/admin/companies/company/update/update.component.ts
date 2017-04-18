import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../../../../models/Company';
import {CompaniesService} from '../../../../../services/companies.service';
import {MsgService} from '../../../../../services/msg';
import {UsersService} from '../../../../../services/users.service';

@Component({
    selector: 'app-company-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})

export class CompanyUpdateComponent implements OnInit {

    private id: number;
    public company: Company;
    public ru: any;

    constructor(private route: ActivatedRoute, private companiesService: CompaniesService, private msg: MsgService, private usersService: UsersService) {
    }

    ngOnInit() {
        this.ru = {
            firstDayOfWeek: 0,
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        };

        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.companiesService.get(this.id).subscribe(
                company => {
                    this.company = company;
                }
            );
        });
    }

    public save() {
        if (!this.company.name.length) {
            this.msg.msg(MsgService.ERROR, 'Заполинте все поля', 'Заполните название компании');
            return false;
        }
        this.companiesService.update(this.company).subscribe(
            company => {
                this.company = company;
                this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Компания успешно изменена.');
            },
            error => {
                this.msg.notice(MsgService.ERROR, 'Ошибка', error);
            }
        );
    }

    public delete() {
        this.companiesService.delete(this.company).subscribe();
    }
}