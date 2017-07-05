import { Component, Input, OnChanges } from '@angular/core';
import { TablePipe } from '../../shared/pipes/table.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TablePipe]
})
export class TableComponent implements OnChanges {
  public head = [];
  public body = [];
  @Input() set options(options: any) {
    this.head = options;
    this.body = this.table.transform(options);
  }

  constructor(private table: TablePipe) {
  }

  ngOnChanges(changes: any) {
    if (changes.options) {
      this.options = changes.options.currentValue;
    }
  }
}
