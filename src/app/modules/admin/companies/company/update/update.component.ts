import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../../models/Company';
import { CompaniesService } from '../../../../../services/companies.service';
import { MsgService } from '../../../../../services/msg';
import * as moment from 'moment';
import { CompanyForm } from '../../../../../forms/company.form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class CompanyUpdateComponent {

  public company: Company = new Company();
  public ru: any;
  public form: FormGroup;
  public submit: boolean;

  constructor(private route: ActivatedRoute,
              private companiesService: CompaniesService,
              private msg: MsgService,
              private companyForm: CompanyForm) {
    this.ru = {
      firstDayOfWeek: 0,
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };
    this.route.params.subscribe(params => {
      const company_id = +params['company'];
      this.companiesService.get(company_id).subscribe(
        company => {
          this.company = company;
          this.form = this.companyForm.create(this.company);
          this.form.valueChanges
            .map((value) => {
              value.active_till = moment(value.active_till).format('YYYY-MM-DD HH:mm:ss');
              return value;
            })
            .subscribe((data) => {
              this.company.name = data.name;
              this.company.active_till = data.active_till;
            });
        }
      );
    });
  }

  public onSubmit() {
    this.submit = true;
    this.companiesService.update(this.company).subscribe(
      company => {
        this.company = company;
        this.companiesService.resync().subscribe();
        this.submit = false;
        this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Компания успешно изменена.');
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public delete() {
    if (confirm('Вы действительно хотите удалить компанию?')) {
      this.companiesService.delete(this.company).subscribe(
        () => {
          this.companiesService.resync().subscribe();
        },
        error => {
          this.msg.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    }
  }
}
