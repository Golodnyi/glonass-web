import {Component} from '@angular/core';
import {Company} from '../../../../shared/models/company.model';
import {MsgService} from '../../../../shared/services/msg';
import {AuthService} from '../../../../shared/services/auth.service';
import {CompaniesService} from '../../../../shared/services/companies.service';
import * as moment from 'moment';
import {CompanyForm} from '../shared/company.form';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Calendar} from '../../../../shared/models/calendar.model';
import { Error } from '../../../../shared/models/error.model';

@Component({
    selector   : 'app-company-create',
    templateUrl: './create.component.html',
    styleUrls  : ['./create.component.css'],
    providers  : [CompanyForm]
})

export class CompanyCreateComponent {

    public company: Company = new Company();
    public ru               = new Calendar();
    public form: FormGroup;
    public submit: boolean;

    constructor(private authService: AuthService,
                private msg: MsgService,
                private companiesService: CompaniesService,
                private companyForm: CompanyForm,
                private router: Router) {
        this.form = this.companyForm.create(this.company);
        this.form.valueChanges
            .map((value) => {
                value.active_till = moment(value.active_till).format();
                return value;
            })
            .subscribe((data) => {
                this.company        = data;
                this.company.author = this.authService.getCurrentUser();
            });
    }

    public onSubmit() {
        this.submit = true;
        this.companiesService.create(this.company).take(1).subscribe(
            company => {
                this.company = company;
                this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Компания ' + this.company.name + ' создана');
                this.router.navigate(['/admin/companies/company', this.company.id]);
            },
            error => {
                this.submit = false;
                Error.check(error, this.router, this.msg);
            }
        );
    }
}
