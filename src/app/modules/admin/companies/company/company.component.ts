import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../../../models/Company';
import {CompaniesService} from '../../../../services/companies.service';
import {MsgService} from '../../../../services/msg';
import {User} from "../../../../models/User";
import {UsersService} from "../../../../services/users.service";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
/**
 * TODO:
 * изменить формат дат на DateTime
 * При изменении компаний, обновлять информацию в дереве компаний
 */
export class CompanyComponent implements OnInit {

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
}
