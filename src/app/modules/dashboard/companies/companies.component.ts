import { Component, OnInit } from '@angular/core';
import {CompaniesService} from "../../../services/companies.service";
import {Company} from "../../../models/Company";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  private companies: Company[];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companiesService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }

}
