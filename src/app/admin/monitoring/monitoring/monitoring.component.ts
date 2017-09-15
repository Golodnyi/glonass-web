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
  public stateWarnings: State[] = [];
  private timer = Observable.timer(0, 5000);
  private timerWarning = Observable.timer(0, 5000);
  private subscriptionTimer: Subscription;
  private subscriptionWarningTimer: Subscription;
  private audio = new Audio();

  constructor(private stateService: StateService) {
    this.audio.src = '/assets/monitoring.wav';
    this.audio.load();
    this.update();
    this.updateWarnings();
  }

  ngOnDestroy() {
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
    if (this.subscriptionWarningTimer) {
      this.subscriptionWarningTimer.unsubscribe();
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

  private updateWarnings() {
    if (this.subscriptionWarningTimer) {
      this.subscriptionWarningTimer.unsubscribe();
    }
    this.subscriptionWarningTimer =
      this.timerWarning.subscribe(
        () => {
          this.stateService.getMonitor(true).subscribe(
            data => {
              this.stateWarnings = data;
              this.sound(data);
            }
          );
        }
      );
  }
}
