import { Component, Input, OnChanges } from '@angular/core';
import { ChartsService } from '../../shared/services/charts.service';
import { KeysPipe } from '../../shared/pipes/keys.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [KeysPipe]
})
export class TableComponent implements OnChanges {
  @Input() car;
  @Input() move = false;
  public table: any;
  public keys = [];
  public loading = true;
  private page = 0;
  constructor(private chartsService: ChartsService, private keysPipe: KeysPipe) {
    if (this.car) {
      this.loadData(this.car);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.car) {
      this.loadData(changes.car.currentValue);
    }
  }

  private loadData(car, page = 0) {
    if (car === undefined) {
      return;
    }

    this.loading = true;
    this.chartsService.getTable(car, page).subscribe(
      table => {
        this.keys = this.keysPipe.transform(table.headers);
        this.table = table;
        this.loading = false;
      }
    );
  }

  public paginate(event) {
    this.page = event.page;
    this.loadData(this.car, this.page);
  }
}
