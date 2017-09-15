import {Component, OnDestroy} from '@angular/core';
import {MsgService} from '../../../../shared/services/msg';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CarCreateForm} from '../../../shared/forms/car/create.form';
import {CarsService} from '../../../../shared/services/cars.service';
import {Car} from '../../../../shared/models/car.model';
import {Subscription} from 'rxjs/Subscription';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {SubdivisionsService} from '../../../../shared/services/subdivisions.service';
import {Company} from '../../../../shared/models/company.model';
import {Subdivision} from '../../../../shared/models/subdivision.model';
import {CarModel} from '../../../../shared/models/car-model.model';
import {CarModelsService} from '../../../../shared/services/car.models.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CarCreateForm]
})

export class CarCreateComponent implements OnDestroy {
  public car: Car = new Car();
  public form: FormGroup;
  public submit: boolean;
  public companies: Company[] = [];
  public subdivisions: Subdivision[] = [];
  public models: CarModel[] = [];
  private subscription: Subscription = new Subscription();
  private subscriptionSubdivision: Subscription;

  constructor(private msg: MsgService,
              private carServices: CarsService,
              private carForm: CarCreateForm,
              private router: Router,
              private companiesService: CompaniesService,
              private subdivisionsService: SubdivisionsService,
              private carModelsService: CarModelsService) {
    this.form = this.carForm.create(this.car);
    this.form.valueChanges
      .subscribe((data) => {
        this.car = data;
      });

    this.subscription.add(
      this.companiesService.all(true).subscribe(
        companies => {
          this.companies = companies;
        }
      )
    );

    this.subscription.add(
      this.carModelsService.all(true).subscribe(
        models => {
          this.models = models;
        }
      )
    );
  }

  public onSubmit() {
    this.submit = true;
    this.carServices.create(this.car).take(1).subscribe(
      car => {
        this.car = car;
        this.msg.notice(MsgService.SUCCESS, 'Сохранено', this.car.name + ' создана');
        this.router.navigate(
          [
            '/admin/companies/company',
            this.car.company_id,
            'subdivision',
            this.car.subdivision_id,
            'car',
            this.car.id
          ]
        );
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onCompany(event: any) {
    if (event.value === null) {
      return;
    }
    if (this.subscriptionSubdivision) {
      this.subscriptionSubdivision.unsubscribe();
    }
    this.subscriptionSubdivision = this.subdivisionsService.all(event.value, true).subscribe(
      subdivisions => {
        this.subdivisions = subdivisions;
      }
    );
  }
}
