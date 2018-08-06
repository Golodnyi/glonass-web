import { Component, OnInit } from '@angular/core';
import { Car } from '../../../../shared/models/car.model';
import { FormGroup } from '@angular/forms';
import { Company } from '../../../../shared/models/company.model';
import { Subdivision } from '../../../../shared/models/subdivision.model';
import { CarModel } from '../../../../shared/models/car-model.model';
import { Subscription } from 'rxjs';
import { MsgService } from '../../../../shared/services/msg';
import { CarsService } from '../../../../shared/services/cars.service';
import { Router } from '@angular/router';
import { CompaniesService } from '../../../../shared/services/companies.service';
import { SubdivisionsService } from '../../../../shared/services/subdivisions.service';
import { EngineCreateForm } from '../shared/create.form';
import { NewEngine } from '../shared/newEngine.model';
import { EnginesService } from '../../../../shared/services/engines.service';
import { EngineModelsService } from '../../../../shared/services/engine.models.service';

@Component({
    selector   : 'app-engine-create',
    templateUrl: './create.component.html',
    styleUrls  : ['./create.component.css'],
    providers  : [EngineCreateForm, EngineModelsService]
})
export class EngineCreateComponent implements OnInit {
    public newEngine: NewEngine        = new NewEngine();
    public cars: Car[]                 = [];
    public form: FormGroup;
    public submit: boolean;
    public companies: Company[]        = [];
    public subdivisions: Subdivision[] = [];
    public models: CarModel[]          = [];
    private subscription: Subscription = new Subscription();
    private subscriptionSubdivision: Subscription;
    private subscriptionCar: Subscription;
    private company_id: number;
    private subdivision_id: number;

    constructor(private msg: MsgService,
                private carServices: CarsService,
                private engineForm: EngineCreateForm,
                private router: Router,
                private companiesService: CompaniesService,
                private subdivisionsService: SubdivisionsService,
                private enginesService: EnginesService,
                private engineModelsService: EngineModelsService) {
        this.form = this.engineForm.create(this.newEngine);
        this.form.valueChanges
            .subscribe((data) => {
                this.newEngine.useModelSensors   = true;
                this.newEngine.car_id            = data.car_id;
                this.newEngine.subdivision_id    = data.subdivision_id;
                this.newEngine.engine.esn        = data.esn;
                this.newEngine.engine.company_id = data.company_id;
                this.newEngine.engine.model_id   = data.model_id;
            });

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

    }

    ngOnInit() {
    }

    public onCompany(event: any) {
        if (event.value === null) {
            return;
        }
        this.company_id = event.value;
        if (this.subscriptionSubdivision) {
            this.subscriptionSubdivision.unsubscribe();
        }
        this.subscriptionSubdivision = this.subdivisionsService.all(event.value, true).subscribe(
            subdivisions => {
                this.subdivisions = subdivisions;
            }
        );
    }

    public onSubdivisions(event: any) {
        if (event.value === null) {
            return;
        }
        this.subdivision_id = event.value;
        if (this.subscriptionCar) {
            this.subscriptionCar.unsubscribe();
        }
        this.subscriptionCar = this.carServices.all(this.company_id, this.subdivision_id, true).subscribe(
            cars => {
                this.cars = cars;
            }
        );
    }

    public onSubmit() {
        this.submit = true;
        this.enginesService.create(this.newEngine).take(1).subscribe(
            baseEngine => {
                this.newEngine.engine = baseEngine;
                this.msg.notice(MsgService.SUCCESS, 'Сохранено', this.newEngine.engine.esn + ' создан');
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
            () => {
                this.submit = false;
            }
        );
    }
}
