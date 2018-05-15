import { Component } from '@angular/core';
import { MsgService } from './shared/services/msg';
import { Message } from 'primeng/primeng';

@Component({
    selector   : 'app-run',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.css']
})
export class AppComponent {
    public growl: Message[] = [];

    constructor(private msgService: MsgService) {
        this.setMessages();
    }

    private setMessages() {
        this.msgService.getNotice().subscribe(
            notice => {
                this.growl = [];
                this.growl.push(notice);
            }
        );
    }
}
