import { Component, OnInit } from '@angular/core';
/// <reference path="./shared/ymaps.d.ts" />
@Component({
  selector: 'app-ymaps',
  templateUrl: './ymaps.component.html',
  styleUrls: ['./ymaps.component.css']
})
export class YmapsComponent implements OnInit {
  public map: any;
  private center = [55.75370903771494, 37.61981338262558];
  constructor() {
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('ymap', {
        center: this.center,
        zoom: 12,
        controls: ['smallMapDefaultSet']
      });
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(data => {
      this.center = [data.coords.latitude, data.coords.longitude];
    });
  }
}
