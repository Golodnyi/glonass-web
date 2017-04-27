import { Component, OnInit } from '@angular/core';
import { MsgService } from './services/msg';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-run',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public growl: Message[] = [];
  public msg: Message[] = [];

  constructor(private msgService: MsgService) {
  }

  ngOnInit() {
    this.msgService.getNotice().subscribe(
      notice => {
        this.growl.push(notice);
      }
    );

    this.msgService.getMsg().subscribe(
      msg => {
        this.msg.push(msg);
      }
    );
  }
}
