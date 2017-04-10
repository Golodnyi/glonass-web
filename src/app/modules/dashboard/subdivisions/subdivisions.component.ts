import {Component, OnInit} from '@angular/core';
import {SubdivisionsService} from "../../../services/subdivisions.service";
import {Subdivision} from "../../../models/Subdivision";
import {ModalService} from "../../../services/modal.service";
import {Input} from '@angular/core';
import {Company} from "../../../models/Company";
import {CompaniesService} from "../../../services/companies.service";

@Component({
    selector: 'app-subdivisions',
    templateUrl: './subdivisions.component.html',
    styleUrls: ['./subdivisions.component.css']
})
export class SubdivisionsComponent implements OnInit {
    private subdivisions: Subdivision[];
    @Input() company: Company;

    constructor() {
    }

    ngOnInit() {

    }
}
