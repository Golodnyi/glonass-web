import { Component, OnDestroy } from '@angular/core';
import { CompaniesService } from '../../shared/services/companies.service';
import { SubdivisionsService } from '../../shared/services/subdivisions.service';
import { CarsService } from '../../shared/services/cars.service';
import { Router } from '@angular/router';
import { Company } from '../../shared/models/company.model';
import { TreePipe } from '../../shared/pipes/tree.pipe';
import { Subdivision } from '../../shared/models/subdivision.model';
import { Car } from '../../shared/models/car.model';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls  : ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {

    public companies: Company[];
    private companySubscribe: Subscription = new Subscription();
    private treeSubscribe                  = [];

    constructor(private companiesService: CompaniesService,
                private subdivisionsService: SubdivisionsService,
                private carsService: CarsService,
                private router: Router,
                private tree: TreePipe) {
        this.companySubscribe.add(
            this.companiesService.all(true).subscribe(
                companies => {
                    this.companies = companies;
                }
            )
        );
    }

    ngOnDestroy() {
        this.companySubscribe.unsubscribe();
        this.unsubscribeTree();
    }

    public onNodeExpand(event: any) {
        this.unsubscribeTree();
        const obj = event.node.data;
        if (obj instanceof Company) {
            this.treeSubscribe.push(
                this.subdivisionsService.all(obj.id, true).subscribe(
                    subdivisions => {
                        event.node.children = this.tree.transform(subdivisions);
                    }
                )
            );
        } else if (obj instanceof Subdivision) {
            const parentObj = [event.node.parent.data];
            this.treeSubscribe.push(
                this.carsService.all(parentObj[0].id, obj.id, true).subscribe(
                    cars => {
                        event.node.children = this.tree.transform(cars, true, true);
                    }
                )
            );
        }
    }

    public onNodeSelect(event: any) {
        const obj = event.node.data;
        if (obj instanceof Company) {
            this.router.navigate(['dashboard/company/' + obj.id]);
        } else if (obj instanceof Car) {
            if (localStorage.getItem('viewMode')) {
                this.router.navigate(['dashboard/view/' + obj.id + '/' + localStorage.getItem('viewMode')]);
            } else {
                this.router.navigate(['dashboard/view/' + obj.id + '/charts']);
            }
        }
    }

    private unsubscribeTree() {
        this.treeSubscribe.forEach(subscribe => {
            subscribe.unsubscribe();
        });
    }
}
