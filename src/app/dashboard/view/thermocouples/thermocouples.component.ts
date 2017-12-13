import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'app/shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-thermocouples',
  templateUrl: './thermocouples.component.html',
  styleUrls: ['./thermocouples.component.css']
})
export class ThermocouplesComponent {
  private subscription: Subscription = new Subscription();
  public options: any = [];

  constructor(private chartsService: ChartsService) {
    this.chartsService.getCar().subscribe(car => {
      if (!car) {
        return false;
      }
      this.options = [];
      this.chartsService.thermocouples(car).subscribe(
        thermocouples => {
          this.options = thermocouples;
        });
    });
  }
}
