import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject, Observable} from "rxjs";
import {Message} from "../models/Message";

@Injectable()
export class ModalService {

    private showModal: BehaviorSubject<Message> = new BehaviorSubject(new Message);

    constructor() {
    }

    public show(title:string, text:string): void {
        this.showModal.next({title: title, text: text, show: true});
    }

    public hide()
    {
        this.showModal.next({title: null, text: null, show: false});
    }


    public isVisible(): Observable<Message> {
        return this.showModal.asObservable();
    }
}
