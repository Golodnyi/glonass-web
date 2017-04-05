import {Component, OnInit} from '@angular/core';
import {SubdivisionsService} from "../../../services/subdivisions.service";
import {Subdivision} from "../../../models/Subdivision";
import {ModalService} from "../../../services/modal.service";
import {Input} from '@angular/core';
import {Company} from "../../../models/Company";

@Component({
    selector: 'app-subdivisions',
    templateUrl: './subdivisions.component.html',
    styleUrls: ['./subdivisions.component.css']
})
export class SubdivisionsComponent implements OnInit {
    @Input() company: number = null;
    private subdivisions: Subdivision[];

    constructor(private subdivisionsService: SubdivisionsService, private modal: ModalService) {
    }

    ngOnInit() {
        if (this.company == null)
        {
            return false;
        }

        this.subdivisionsService.getSubdivisions(this.company).subscribe(
            subdivision => {
                this.subdivisions = subdivision;
            },
            error => {
                this.modal.show('Ошибка', error);
            }
        );
    }

}
