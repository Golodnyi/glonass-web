import {Component, Input, OnInit} from '@angular/core';
import {ChartsService} from "../../../services/charts.service";
import {Message} from "primeng/primeng";
import {CarsService} from "../../../services/cars.service";

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
    private msgs: Message[] = [];
    private car: number;

    constructor(private chartsService: ChartsService, private carsService: CarsService) {
    }

    ngOnInit() {
        this.carsService.getCar().subscribe(
            car => {
                this.car = car;
                this.chartsService.getData(car).subscribe(
                    data => {
                    },
                    error => {
                        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
                    }
                );
            }
        );
    }

}
