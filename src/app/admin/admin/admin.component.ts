import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls  : ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    companiesActions: MenuItem[] = [];
    usersActions: MenuItem[]     = [];
    rolesActions: MenuItem[]     = [];

    constructor(private router: Router, private translateService: TranslateService) {
        this.companiesActions = [
            {
                label: this.translateService.instant('admin.createCompany'), command: () => {
                this.router.navigate(['/admin/companies/company/create']);
            }
            },
            {
                label: this.translateService.instant('admin.createSubdivision'), command: () => {
                this.router.navigate(['/admin/companies/subdivision/create']);
            }
            },
            {
                label: this.translateService.instant('admin.createCar'), command: () => {
                this.router.navigate(['/admin/companies/car/create']);
            }
            },
            {
                label: this.translateService.instant('admin.createEngine'), command: () => {
                this.router.navigate(['/admin/companies/engine/create']);
            }
            }
        ];

        this.usersActions = [
            {
                label: this.translateService.instant('admin.createUser'), command: () => {
                this.router.navigate(['/admin/users/user/create']);
            }
            }
        ];

        this.rolesActions = [
            {
                label: this.translateService.instant('admin.createRole'), command: () => {
            }
            }
        ];
    }

    ngOnInit() {
    }

    public company() {
        this.router.navigate(['/admin/companies']);
    }

    public users() {
        this.router.navigate(['/admin/users']);
    }

    public roles() {
        this.router.navigate(['/admin/roles']);
    }

    public monitor() {
        this.router.navigate(['/admin/monitoring']);
    }

    public configurator() {
        this.router.navigate(['/admin/configurator']);
    }
}
