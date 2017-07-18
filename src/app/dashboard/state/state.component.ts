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

  ngOnChanges() {
    if (this.state && this.state.issues.length) {
      this.state.issues.forEach(issue => {
        if (!this.isMuted(issue.id)) {
          this.audio.play();
        }
      });
    }
  }

  public online() {
    return (Number(moment().format('X')) - Number(this.state.timestamp) / 1000) < 3600;
  }

  public mute(id) {
    if (localStorage.getItem('mute_' + id) === null) {
      localStorage.setItem('mute_' + id, id);
      this.audio.pause();
    }
  }

  public unMute(id) {
    if (localStorage.getItem('mute_' + id) !== null) {
      localStorage.removeItem('mute_' + id);
    }
  }

  public isMuted(id) {
    return !(localStorage.getItem('mute_' + id) === null);
  }
}
