import {Component, Input, OnInit} from '@angular/core';
import {CarsService} from "../../../services/cars.service";
import {Car} from "../../../models/Car";
import {ModalService} from "../../../services/modal.service";
import {SubdivisionsService} from "../../../services/subdivisions.service";
import {Company} from "../../../models/Company";

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
    private cars: Car[];
    @Input() company: Company;

    constructor() {
    }

    ngOnInit() {

    }

}
