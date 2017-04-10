import {Component, OnInit} from '@angular/core';
import {CarsService} from "../../../services/cars.service";
import {Message} from "primeng/primeng";
import {Car} from "../../../models/Car";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private msgs: Message[] = [];
    private car: number;

    constructor(private carService: CarsService) {
    }

    ngOnInit() {
        this.carService.getCar().subscribe(
            car => {
                this.car = car;
            }
        );
    }

}
