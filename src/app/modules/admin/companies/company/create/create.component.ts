import { Component } from '@angular/core';
import { Company } from '../../../../../models/Company';
import { MsgService } from '../../../../../services/msg';
import { AuthService } from '../../../../../services/auth.service';
import { CompaniesService } from '../../../../../services/companies.service';
import * as moment from 'moment';
import { CompanyForm } from '../../../../../forms/company.form';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CompanyForm]
})

export class CompanyCreateComponent {

  public company: Company = new Company();
  public ru: any;
  public form: FormGroup;
  public submit: boolean;

  constructor(private authService: AuthService,
              private msg: MsgService,
              private companiesService: CompaniesService,
              private companyForm: CompanyForm,
              private router: Router) {
    this.form = this.companyForm.create(this.company);

    this.ru = {
      firstDayOfWeek: 0,
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };

    this.form.valueChanges
      .map((value) => {
        value.active_till = moment(value.active_till).format('YYYY-MM-DD HH:mm:ss');
        return value;
      })
      .subscribe((data) => {
        this.company = data;
        this.authService.getCurrentUser().subscribe(
          user => {
            this.company.author = user;
          }
        );
      });
  }

  public onSubmit() {
    this.submit = true;
    this.companiesService.create(this.company).subscribe(
      company => {
        this.company = company;
        this.companiesService.resync().subscribe();
        this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Компания ' + this.company.name + ' создана');
        this.router.navigate(['/admin/companies/company', this.company.id]);
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }
}
