import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ChartsService } from '../../shared/services/charts.service';
import { KeysPipe } from '../../shared/pipes/keys.pipe';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Filter } from '../../shared/models/filter.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [KeysPipe]
})
export class TableComponent implements OnChanges, OnDestroy {
  @Input() car;
  @Input() move = false;
  @Input() autoRefresh = false;
  @Input() filter: Filter;
  public table: any;
  public keys = [];
  public loading = true;
  private page = 0;
  private subscriptionAutoRefresh: Subscription;
  private timer = Observable.timer(0, 5000);

  constructor(private chartsService: ChartsService, private keysPipe: KeysPipe) {
    if (this.car) {
      this.loadData(this.car);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.car) {
      this.loadData(changes.car.currentValue);
    }

    if (changes.autoRefresh && !changes.autoRefresh.firstChange) {
      this.loadData(this.car);
    }

    if (changes.filter && !changes.filter.firstChange) {
      this.loadData(this.car);
    }
  }

  private loadData(car, page = 0) {
    if (car === undefined) {
      return;
    }

    this.loading = true;

    if (this.autoRefresh) {
      this.subscriptionAutoRefresh = this.timer.subscribe(
        () => {
          this.chartsService.getTable(car, page).subscribe(
            table => {
              this.keys = this.keysPipe.transform(table.headers);
              this.table = table;
              this.loading = false;
            }
          );
        }
      );
    } else {
      this.chartsService.getTable(car, page).subscribe(
        table => {
          this.keys = this.keysPipe.transform(table.headers);
          this.table = table;
          this.loading = false;
        }
      );
    }

  }

  public paginate(event) {
    this.page = event.page;
    this.loadData(this.car, this.page);
  }

  ngOnDestroy() {
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
  }
}
