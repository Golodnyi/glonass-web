import { Component, Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SchemeService } from '../shared/scheme.service';
import { Scheme } from 'app/admin/configurator/shared/scheme.model';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css'],
  providers: [SchemeService]
})
export class SchemeComponent implements OnChanges {
  @Input() car: number;

  public scheme: Scheme;
  public allowedPorts = [];

  constructor(private schemeService: SchemeService) {
    if (this.car && this.car !== undefined) {
      this.viewScheme();
    }
  }

  ngOnChanges() {
    if (this.car && this.car !== undefined) {
      this.viewScheme();
    }
  }

  public viewScheme(): void {
    if (!this.car || this.car === undefined) {
      return;
    }

    this.schemeService.overallScheme(this.car).subscribe(
      scheme => {
        this.scheme = scheme;
        this.allowedPorts = [];
        this.scheme.allowedPorts.forEach(item => {
          this.allowedPorts.push({ value: item, label: item });
        });
      }
    );
  }
}
