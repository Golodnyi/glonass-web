import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {CompaniesService} from "../../../services/companies.service";
import {ModalService} from "../../../services/modal.service";
import {SubdivisionsService} from "../../../services/subdivisions.service";
import {CarsService} from "../../../services/cars.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public companies: TreeNode[];
    public select: TreeNode;

    constructor(private companiesService: CompaniesService, private modal: ModalService, private subdivisionsService: SubdivisionsService, private carsService: CarsService) {
    }

    ngOnInit() {
        this.companiesService.getCompaniesAsTree().subscribe(
            tree => {
                this.companies = tree;
                console.log(this.companies);
            },
            error => {
                this.modal.show('Ошибка', error);
            }
        );
    }

    public loadNode(event: any) {
        if (event.node) {
            if (event.node.type == 'company')
            {
                this.subdivisionsService.getSubdivisionsAsTree(event.node.data).subscribe(
                    tree => {
                        event.node.children = tree;
                    },
                    error => {
                        this.modal.show('Ошибка', error);
                    }
                );
            } else if (event.node.type == 'subdivision')
            {
                console.log(event.node);
                this.carsService.getCarsAsTree(event.node.parent.data, event.node.data).subscribe(
                    tree => {
                        event.node.children = tree;
                    },
                    error => {
                        this.modal.show('Ошибка', error);
                    }
                );
            }
        }
    }
}
