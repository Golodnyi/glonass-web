import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ChartsService } from '../../shared/services/charts.service';
import { KeysPipe } from '../../shared/pipes/keys.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Filter } from '../../shared/models/filter.model';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-thermocouples-table',
  templateUrl: './thermocouples-table.component.html',
  styleUrls: ['./thermocouples-table.component.css'],
  providers: [KeysPipe]
})
export class ThermocouplesTableComponent implements OnChanges, OnDestroy {
  @Input() car;
  @Input() move = false;
  @Input() autoRefresh = false;
  @Input() filter: Filter;
  public table: any;
  public loading = false;
  public keys = [];
  private page = 0;
  private tsort = 'time';
  private tdir = 1;
  private subscriptionAutoRefresh: Subscription;
  private subscription: Subscription;
  private timer = TimerObservable.create(0, 5000);

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

    if (changes.move && !changes.move.firstChange) {
      this.loadData(this.car, this.move);
    }
  }

  public paginate(event) {
    this.page = event.page;
    this.loadData(this.car, this.move, this.page, this.tsort, (this.tdir === -1 ? 'asc' : 'desc'));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
  }

  public sort(event: any) {
    if (this.tsort === event.field && this.tdir === event.order) {
      return false;
    }

    this.tsort = event.field;
    this.tdir = event.order;
    this.loadData(this.car, this.move, this.page, this.tsort, (this.tdir === -1 ? 'asc' : 'desc'));
  }

  private loadData(car, move = false, page = 0, sort = 'time', dir = 'desc') {
    if (car === undefined) {
      return;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription =
      this.chartsService.getFilter().subscribe(
        () => {
          if (this.subscriptionAutoRefresh) {
            this.subscriptionAutoRefresh.unsubscribe();
          }
          if (!page) {
            this.subscriptionAutoRefresh = this.timer.subscribe(
              () => {
                this.chartsService.thermocouplesTable(car, page).subscribe(
                  table => {
                    this.keys = this.keysPipe.transform(table.headers, false);
                    this.table = table;
                    this.loading = false;
                  }
                );
              }
            );
          } else {
            this.chartsService.thermocouplesTable(car, page).subscribe(
              table => {
                this.keys = this.keysPipe.transform(table.headers, false);
                this.table = table;
                this.loading = false;
              }
            );
          }
        }
      );
  }
}
