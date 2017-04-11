import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from "primeng/primeng";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MsgService {
    public static SUCCESS = 'success';
    public static INFO = 'info';
    public static WARN = 'warn';
    public static ERROR = 'error';

    private _growl: Subject<Message> = new Subject();
    private _msg: Subject<Message> = new Subject();

    constructor() {

    }

    public notice(severity: string, summary: string, detail: string) {
        this._growl.next({severity, summary, detail});
    }

    public getNotice(): Observable<Message> {
        return this._growl.asObservable();
    }

    public msg(severity: string, summary: string, detail: string) {
        this._msg.next({severity, summary, detail});
    }

    public getMsg(): Observable<Message> {
        return this._msg.asObservable();
    }
}
