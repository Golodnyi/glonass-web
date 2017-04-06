import {Component, OnInit, Output} from '@angular/core';
import {CompaniesService} from "../../../services/companies.service";
import {Company} from "../../../models/Company";
import {ModalService} from "../../../services/modal.service";

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

    private companies: Company[];

    constructor(private companiesService: CompaniesService, private modal: ModalService) {
    }

    ngOnInit() {
        this.companiesService.getCompanies().subscribe(
            companies => {
                this.companies = companies;
                this.companiesService.setCompany(companies[0]);
            },
            error => {
                this.modal.show('Ошибка', error);
            }
        );
    }

    public changeCompany(company: Company)
    {
        this.companiesService.setCompany(company);
    }
}
