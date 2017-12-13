import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'app/shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from 'app/shared/models/car.model';

@Component({
  selector: 'app-thermocouples',
  templateUrl: './thermocouples.component.html',
  styleUrls: ['./thermocouples.component.css']
})
export class ThermocouplesComponent {
  private subscription: Subscription = new Subscription();
  public options: any;
  public table: any;
  public car: Car;

  constructor(private chartsService: ChartsService) {
    this.chartsService.getCar().subscribe(car => {
      if (!car) {
        return false;
      }
      this.car = car;

      this.options = [];
      this.chartsService.thermocouples(car).subscribe(
        thermocouples => {
          this.options = thermocouples;
        }
      );
    });
  }
}
