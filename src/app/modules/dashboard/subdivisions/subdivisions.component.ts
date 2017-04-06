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

    constructor(private subdivisionsService: SubdivisionsService, private modal: ModalService, private companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.companiesService.getCompany().subscribe(company => {
            this.subdivisionsService.getSubdivisions(company).subscribe(
                subdivisions => {
                    this.subdivisions = subdivisions;
                },
                error => {
                    this.modal.show('Ошибка', error);
                }
            );
        });
    }

    public changeSubdivision(subdivision: Subdivision)
    {
        this.subdivisionsService.setSubdivision(subdivision);
    }
}
