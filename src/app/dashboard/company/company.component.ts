import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { SubdivisionsService } from '../../shared/services/subdivisions.service';
import { Subdivision } from '../../shared/models/subdivision.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public subdivisions: Subdivision[];

  constructor(private subdivisionsService: SubdivisionsService,
              private carsService: CarsService,
              private route: ActivatedRoute) {
    this.subscription.add(this.route.params.subscribe(params => {
        const company_id = +params['company'];
        this.subscription.add(
          this.subdivisionsService.all(company_id, true).subscribe(
            subdivisions => {
              this.subdivisions = subdivisions;
              this.subdivisions.forEach(subdiv => {
                this.subscription.add(
                  this.carsService.all_sync(company_id, subdiv.id).subscribe(
                    cars => {
                      subdiv.cars = cars;
                      subdiv.cars.forEach(car => {
                        this.carsService.getState(car.id).subscribe(
                          state => {
                            car.state = state;
                          }
                        );
                      });
                    }
                  )
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
