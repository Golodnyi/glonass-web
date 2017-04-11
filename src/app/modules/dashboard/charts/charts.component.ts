import {Component, Input, OnInit} from '@angular/core';
import {ChartsService} from "../../../services/charts.service";
import {CarsService} from "../../../services/cars.service";
import {MsgService} from "../../../services/msg";

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
    private car: number;

    constructor(private chartsService: ChartsService, private carsService: CarsService, private msgService: MsgService) {
    }

    ngOnInit() {
        this.carsService.getCar().subscribe(
            car => {
                if (car == null)
                {
                    return false;
                }
                
                this.car = car;
                this.chartsService.getData(car).subscribe(
                    data => {
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
            }
        );
    }

}
