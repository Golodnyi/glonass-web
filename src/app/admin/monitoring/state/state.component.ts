import {Component, Input, OnInit} from '@angular/core';
import {State} from '../monitoring/shared/state.model';

@Component({
  selector: 'app-admin-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  @Input() state: State;

  constructor() { }

  ngOnInit() {
  }

}
