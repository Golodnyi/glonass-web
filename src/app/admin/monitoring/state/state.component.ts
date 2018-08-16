import { Component, Input, EventEmitter, Output } from '@angular/core';
import { State } from '../monitoring/shared/state.model';
import * as moment from 'moment';
import { isComponentView } from '@angular/core/src/view/util';

@Component({
    selector: 'app-admin-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.css'],
})
export class StateComponent {
    @Input() state: State;
    @Output() showComments = new EventEmitter();

    public static online(timestamp: number) {
        return (Number(moment().format('X')) - Number(timestamp) / 1000) < 3600;
    };

    public static lastDate(timestamp: number) {
        return moment.unix(timestamp / 1000).format('DD.MM.YYYY H:mm');
    };

    public online(timestamp: number) {
        return StateComponent.online(timestamp);
    };

    public lastDate(timestamp: number) {
        return StateComponent.lastDate(timestamp);
    };

    public showModal() {
        this.showComments.emit(true);
    }

    public toogle(event: any, id: number) {
        let collapsed = [];
        if (localStorage.getItem('collapsed')) {
            collapsed = JSON.parse(localStorage.getItem('collapsed'));
        }

        if (event.collapsed) {
            let exist = false;
            collapsed.forEach(item => {
                if (item === id) {
                    exist = true;
                    return false;
                }
            });

            if (!exist) {
                collapsed.push(id);
            }
        } else {
            collapsed = collapsed.filter(item => {
                return item !== id;
            });
        }

        localStorage.setItem('collapsed', JSON.stringify(collapsed));
    }

    public isClosed(id: number): boolean {
        let collapsed = [];
        if (localStorage.getItem('collapsed')) {
            collapsed = JSON.parse(localStorage.getItem('collapsed'));
        }

        let closed = true;
        collapsed.forEach(item => {
            if (item === id) {
                closed = false;
                return false;
            }
        });

        return closed;
    }
}

