import { Component, Input, OnChanges } from '@angular/core';
import { State } from './shared/state.model';
import * as moment from 'moment';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnChanges {
  @Input() state: State;
  @Input() title: string;
  @Input() toggleable = true;
  @Input() compact = false;
  private audio = new Audio();
  constructor() {
    this.audio.src = '/assets/signal.mp3';
    this.audio.load();
  }

  ngOnChanges(changes) {
    if (this.state && this.state.issues.length) {
      // this.audio.play();
    }
  }

  public online() {
    return (Number(moment().format('X')) - Number(this.state.timestamp) / 1000) < 3600;
  }
}
