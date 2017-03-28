import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
    private isModalShown: boolean = false;
    private modalTitle: string;
    private modalBody: string;

    constructor(private modal: ModalService) {
    }

    ngOnInit() {
        this.modal.isVisible().subscribe(msg => {
            this.modalTitle = msg.title;
            this.modalBody = msg.text;
            this.isModalShown = msg.show;
        });
    }

    public hide() {
        this.modal.hide();
    }
}
