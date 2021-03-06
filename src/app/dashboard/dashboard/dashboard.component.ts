import { Component, OnDestroy } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { ChartsService } from '../../shared/services/charts.service';
import { IState } from '../state/shared/state.model';
import { Subscription } from 'rxjs';
import { EnginesService } from '../../shared/services/engines.service';
import { Engine } from '../../shared/models/engine.model';
import { Car } from '../../shared/models/car.model';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector   : 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
    public state: IState;
    public car: Car;
    private subscription: Subscription = new Subscription();
    private subscriptionTimer: Subscription;
    private timer                      = TimerObservable.create(0, 5000);

    constructor(private carsService: CarsService,
                private chartsService: ChartsService,
                private engineService: EnginesService,
                private authService: AuthService) {
        this.subscription.add(
            this.chartsService.getCar().subscribe(car => {
                this.car = car;

                if (car === null || !Object.keys(car).length) {
                    this.state = null;
                    if (this.subscriptionTimer) {
                        this.subscriptionTimer.unsubscribe();
                    }
                    return;
                }
                this.engineService.get(1, 1, car.id, true).subscribe(
                    engine => {
                        car.engine = Object.assign(new Engine(), engine);
                    }
                );

                if (this.subscriptionTimer) {
                    this.subscriptionTimer.unsubscribe();
                }
                this.subscriptionTimer =
                    this.timer.subscribe(() => {
                        this.carsService.getState(car.id).subscribe(
                            state => {
                                this.state = state;
                            }
                        );
                    });
            })
        );
    }

    ngOnDestroy() {
        if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
        }
        this.subscription.unsubscribe();
    }

    public isAdmin(): boolean {
        return this.authService.isAdmin();
    }
}
