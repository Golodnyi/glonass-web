import {Component, OnInit} from '@angular/core';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {CompaniesService} from "../../../services/companies.service";
import {ModalService} from "../../../services/modal.service";
import {Company} from "../../../models/Company";
import {SubdivisionsService} from "../../../services/subdivisions.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public companies: TreeNode[];
    public select: TreeNode;

    constructor(private companiesService: CompaniesService, private modal: ModalService, private subdivisionsService: SubdivisionsService) {
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
            }
        }
    }
}
