import {Component, OnInit} from '@angular/core';
import {Car} from '../../../../shared/models/car.model';
import {FormGroup} from '@angular/forms';
import {Company} from '../../../../shared/models/company.model';
import {Subdivision} from '../../../../shared/models/subdivision.model';
import {CarModel} from '../../../../shared/models/car-model.model';
import {Subscription} from 'rxjs/Subscription';
import {MsgService} from '../../../../shared/services/msg';
import {ActivatedRoute, Router} from '@angular/router';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {NewEngine} from '../shared/newEngine.model';
import {EnginesService} from '../../../../shared/services/engines.service';
import {EngineModelsService} from '../../../../shared/services/engine.models.service';
import {EngineUpdateForm} from '../shared/update.form';
import {BaseEngine} from '../../../../shared/models/baseEngine.model';

@Component({
    selector   : 'app-update',
    templateUrl: './update.component.html',
    styleUrls  : ['./update.component.css'],
    providers  : [EngineUpdateComponent, EngineModelsService, EngineUpdateForm]
})
export class EngineUpdateComponent implements OnInit {
    public newEngine: NewEngine        = new NewEngine();
    public cars: Car[]                 = [];
    public form: FormGroup;
    public submit: boolean;
    public companies: Company[]        = [];
    public subdivisions: Subdivision[] = [];
    public models: CarModel[]          = [];
    private subscription: Subscription = new Subscription();

    constructor(private msg: MsgService,
                private engineForm: EngineUpdateForm,
                private router: Router,
                private companiesService: CompaniesService,
                private enginesService: EnginesService,
                private route: ActivatedRoute,
                private engineModelsService: EngineModelsService) {
        this.route.params.subscribe(params => {
            const company_id     = +params['company'];
            const subdivision_id = +params['subdivision'];
            const car_id         = +params['car'];
            this.enginesService.getBase(company_id, subdivision_id, car_id).subscribe(
                engine => {
                    this.newEngine.engine = Object.assign(new BaseEngine(), engine);
                    this.form             = this.engineForm.create(this.newEngine);
                    this.form.valueChanges
                        .subscribe((data) => {
                            this.newEngine.resetSensors      = false;
                            this.newEngine.car_id            = data.car_id;
                            this.newEngine.subdivision_id    = data.subdivision_id;
                            this.newEngine.engine.esn        = data.esn;
                            this.newEngine.engine.company_id = data.company_id;
                            this.newEngine.engine.model_id   = data.model_id;
                        });

                }
            );

            this.subscription.add(
                this.companiesService.all(true).subscribe(
                    companies => {
                        this.companies = companies;
                    }
                )
            );

            this.subscription.add(
                this.engineModelsService.all(true).subscribe(
                    models => {
                        this.models = models;
                    }
                )
            );
        });
    }

    ngOnInit() {
    }

    public onSubmit() {
        this.submit = true;
        this.enginesService.update(this.newEngine).take(1).subscribe(
            baseEngine => {
                this.newEngine.engine = baseEngine;
                this.msg.notice(MsgService.SUCCESS, 'Сохранено', this.newEngine.engine.esn + ' изменен');
                this.router.navigate(
                    [
                        '/admin/companies/company',
                        this.newEngine.engine.company_id,
                        'subdivision',
                        this.newEngine.subdivision_id,
                        'car',
                        this.newEngine.car_id,
                        'engine',
                        this.newEngine.engine.id
                    ]
                );
            },
            error => {
                this.submit = false;
                this.msg.notice(MsgService.ERROR, 'Ошибка', error);
            }
        );
    }
}
