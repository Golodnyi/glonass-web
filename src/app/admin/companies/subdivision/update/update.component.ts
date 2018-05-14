import {Component} from '@angular/core';
import {Company} from '../../../../shared/models/company.model';
import {MsgService} from '../../../../shared/services/msg';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {Subdivision} from '../../../../shared/models/subdivision.model';
import {SubdivisionsService} from '../../../../shared/services/subdivisions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {SubdivisionUpdateForm} from '../shared/update.form';
import { Error } from '../../../../shared/models/error.model';

@Component({
    selector   : 'app-subdivision-update',
    templateUrl: './update.component.html',
    styleUrls  : ['./update.component.css'],
    providers  : [SubdivisionUpdateForm]
})

export class SubdivisionUpdateComponent {

    public subdivision: Subdivision;
    public companies: Company[];
    public form: FormGroup;
    public submit: boolean;

    constructor(private msg: MsgService,
                private subdivisionsService: SubdivisionsService,
                private route: ActivatedRoute,
                private companiesService: CompaniesService,
                private subdivisionUpdateForm: SubdivisionUpdateForm,
                private router: Router) {
        this.route.params.subscribe(params => {
            const company_id: number     = +params['company'];
            const subdivision_id: number = +params['subdivision'];
            this.subdivisionsService.get(company_id, subdivision_id, true).subscribe(
                subdivision => {
                    this.subdivision = subdivision;
                    this.form        = this.subdivisionUpdateForm.create(this.subdivision);
                    this.form.valueChanges.subscribe((data) => {
                        this.subdivision.name = data.name;
                    });
                },
                error => {
                    Error.check(error, this.router, this.msg);
                }
            );
        });
        this.companiesService.all(false).subscribe(
            companies => {
                this.companies = companies;
            },
            error => {
                Error.check(error, this.router, this.msg);
            }
        );
    }

    public onSubmit() {
        this.subdivisionsService.update(this.subdivision).take(1).subscribe(
            subdivision => {
                this.subdivision = subdivision;
                this.submit      = false;
                this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Подразделение успешно изменено');
            },
            error => {
                this.submit = false;
                Error.check(error, this.router, this.msg);
            }
        );
    }

    public delete() {
        if (confirm('Вы действительно хотите удалить подразделение?')) {
            this.subdivisionsService.delete(this.subdivision).take(1).subscribe(
                () => {
                },
                error => {
                    Error.check(error, this.router, this.msg);
                }
            );
        }
    }
}
