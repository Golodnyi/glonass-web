import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {StateService} from './shared/state.service';
import {State} from './shared/state.model';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
  providers: [StateService]
})
export class MonitoringComponent implements OnDestroy {
  public state: State[] = [];
  private timer = Observable.timer(0, 5000);
  private subscriptionTimer: Subscription;
  private audio = new Audio();

  constructor(private stateService: StateService) {
    this.audio.src = '/assets/monitoring.wav';
    this.audio.load();
    this.update();
  }

  ngOnDestroy() {
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
  }

  private update() {
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
    this.subscriptionTimer =
      this.timer.subscribe(
        () => {
          this.stateService.getMonitor(false).subscribe(
            data => {
              this.state = data;
              this.sound(data);
            }
          );
        }
      );
  }

  private sound(data: any) {
    data.forEach(item => {
      if (item.issues && item.issues.length && this.audio.paused) {
        this.audio.play();
      }
    });
  }
}
