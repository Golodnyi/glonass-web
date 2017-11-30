import { Component, OnInit } from '@angular/core';
import { Car } from 'app/shared/models/car.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent {
  public car: number;

  constructor() { }

  public carUpdate(car: number) {
    this.car = car;
  }
}
