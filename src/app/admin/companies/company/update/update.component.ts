import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../../../../shared/models/company.model';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {MsgService} from '../../../../shared/services/msg';
import * as moment from 'moment';
import {CompanyForm} from '../shared/company.form';
import {FormGroup} from '@angular/forms';
import {Calendar} from '../../../../shared/models/calendar.model';

@Component({
    selector   : 'app-company-update',
    templateUrl: './update.component.html',
    styleUrls  : ['./update.component.css'],
    providers  : [CompanyForm]
})

export class CompanyUpdateComponent {

    public company: Company = new Company();
    public ru               = new Calendar();
    public form: FormGroup;
    public submit: boolean;

    constructor(private route: ActivatedRoute,
                private companiesService: CompaniesService,
                private msg: MsgService,
                private companyForm: CompanyForm,
                private router: Router) {
        this.route.params.subscribe(params => {
            const company_id = +params['company'];
            this.companiesService.get(company_id, true).subscribe(
                company => {
                    this.company = company;
                    this.form    = this.companyForm.create(this.company);
                    this.form.valueChanges
                        .map((value) => {
                            value.active_till = moment(value.active_till).format();
                            return value;
                        })
                        .subscribe((data) => {
                            this.company.name        = data.name;
                            this.company.active_till = data.active_till;
                        });
                }
            );
        });
    }

    public onSubmit() {
        this.submit = true;
        this.companiesService.update(this.company).take(1).subscribe(
            company => {
                this.company = company;
                this.submit  = false;
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
            this.companiesService.delete(this.company).take(1).subscribe(
                () => {
                    this.router.navigate(['/admin/companies']);
                },
                error => {
                    this.msg.notice(MsgService.ERROR, 'Ошибка', error);
                }
            );
        }
    }
}
