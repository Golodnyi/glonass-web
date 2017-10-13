import {Component, OnDestroy} from '@angular/core';
import {MsgService} from '../../../../shared/services/msg';
import {CarsService} from '../../../../shared/services/cars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubdivisionsService} from '../../../../shared/services/subdivisions.service';
import {CarModelsService} from '../../../../shared/services/car.models.service';
import {Car} from '../../../../shared/models/car.model';
import {FormGroup} from '@angular/forms';
import {Subdivision} from '../../../../shared/models/subdivision.model';
import {CarModel} from '../../../../shared/models/car-model.model';
import {Subscription} from 'rxjs/Subscription';
import {CarUpdateForm} from '../shared/update.form';

@Component({
  selector: 'app-car-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [CarUpdateForm]
})
export class CarUpdateComponent implements OnDestroy {
  public car: Car = new Car();
  public form: FormGroup;
  public submit: boolean;
  public subdivisions: Subdivision[] = [];
  public models: CarModel[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private msg: MsgService,
              private carServices: CarsService,
              private carForm: CarUpdateForm,
              private router: Router,
              private subdivisionsService: SubdivisionsService,
              private carModelsService: CarModelsService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const car_id = +params['car'];
      const company_id = +params['company'];
      this.subscription.add(
        this.carServices.get(car_id, true).subscribe(car => {
          this.car = car;
          this.form = this.carForm.create(this.car);
          this.form.valueChanges
            .subscribe((data) => {
              this.car = data;
            });
          this.subscription.add(
            this.subdivisionsService.all(company_id, true).subscribe(
              subdivisions => {
                this.subdivisions = subdivisions;
              }
            )
          );
        })
      );

      this.subscription.add(
        this.carModelsService.all(true).subscribe(
          models => {
            this.models = models;
          }
        )
      );
    });
  }


  public onSubmit() {
    this.submit = true;
    this.carServices.update(this.car).take(1).subscribe(
      car => {
        this.car = car;
        this.msg.notice(MsgService.SUCCESS, 'Сохранено', this.car.name + ' изменена');
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
}
