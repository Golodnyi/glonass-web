import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../shared/models/car.model';
import { State } from '../state/shared/state.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public cars: Car[];

  constructor(private carsService: CarsService, private route: ActivatedRoute) {
    this.subscription.add(this.route.params.subscribe(params => {
        const company_id = +params['company'];
        this.subscription.add(
          this.carsService.byCompany(company_id, true).subscribe(
            cars => {
              this.cars = cars;
              this.cars.forEach(car => {
                this.carsService.getState(car.id).subscribe(
                  state => {
                    car.state = Object.assign(new State, state);
                  }
                );
              });
            }
          )
        );
      })
    );
  }

  ngOnInit() {
  }

}
