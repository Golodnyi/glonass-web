import { Component, OnInit } from '@angular/core';
import { IState, State } from './shared/state.model';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  public state: IState = new State();
  constructor() {
  }

  ngOnInit() {
  }

}
