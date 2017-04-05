import {Component, Input, OnInit} from '@angular/core';
import {CarsService} from "../../../services/cars.service";
import {Car} from "../../../models/Car";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  @Input() company: number = null;
  @Input() subdivision: number = null;
  private cars: Car[];

  constructor(private carsService: CarsService, private modal: ModalService) { }

  ngOnInit() {
    if (this.subdivision == null)
    {
      return false;
    }

    this.carsService.getCars(this.company, this.subdivision).subscribe(
        cars => {
          this.cars = cars;
        },
        error => {
          this.modal.show('Ошибка', error);
        }
    );
  }

}
