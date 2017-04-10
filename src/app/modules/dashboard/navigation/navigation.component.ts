import {Component, OnInit} from '@angular/core';
import {Message, TreeNode} from 'primeng/primeng';
import {CompaniesService} from "../../../services/companies.service";
import {SubdivisionsService} from "../../../services/subdivisions.service";
import {CarsService} from "../../../services/cars.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public companies: TreeNode[];
    public node: TreeNode;
    private msgs: Message[] = [];

    constructor(private companiesService: CompaniesService, private subdivisionsService: SubdivisionsService, private carsService: CarsService) {
    }

    ngOnInit() {
        this.companiesService.getCompaniesAsTree().subscribe(
            tree => {
                this.companies = tree;
            },
            error => {
                this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
            }
        );
    }

    public onNodeExpand(event: any) {
        if (event.node) {
            if (event.node.type == 'company')
            {
                this.subdivisionsService.getSubdivisionsAsTree(event.node.data).subscribe(
                    tree => {
                        event.node.children = tree;
                    },
                    error => {
                        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
                    }
                );
            } else if (event.node.type == 'subdivision')
            {
                this.carsService.getCarsAsTree(event.node.parent.data, event.node.data, true, true).subscribe(
                    tree => {
                        event.node.children = tree;
                    },
                    error => {
                        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
                    }
                );
            }
        }
    }

    public onNodeSelect(event: any)
    {
        if (event.node.type == 'car')
        {
            this.carsService.setCar(event.node.data);
        }
    }
}
