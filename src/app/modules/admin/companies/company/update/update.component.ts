import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../../models/Company';
import { CompaniesService } from '../../../../../services/companies.service';
import { MsgService } from '../../../../../services/msg';
import * as moment from 'moment';
import { CompanyForm } from '../../../../../forms/company.form';
import { FormGroup } from '@angular/forms';
import { Calendar } from '../../../../../models/Calendar';

@Component({
  selector: 'app-company-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [CompanyForm]
})

export class CompanyUpdateComponent {

  public company: Company = new Company();
  public ru = new Calendar();
  public form: FormGroup;
  public submit: boolean;

  constructor(private route: ActivatedRoute,
              private companiesService: CompaniesService,
              private msg: MsgService,
              private companyForm: CompanyForm) {
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
