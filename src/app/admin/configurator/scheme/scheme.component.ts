import { Component, OnInit, Input } from '@angular/core';
import { OnDestroy, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})
export class SchemeComponent implements OnChanges {
  @Input() car: number;

  constructor() {
    if (this.car && this.car !== undefined) {
      this.viewScheme();
    }
  }

  ngOnChanges() {
    if (this.car && this.car !== undefined) {
      this.viewScheme();
    }
  }

  public viewScheme() {

  }
}
