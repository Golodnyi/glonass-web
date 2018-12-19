import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ReportForm } from './shared/report.form';
import { Report } from './shared/report.model';
import { ReportsService } from './shared/reports.service';
import { Car } from '../../../shared/models/car.model';

@Component({
    selector   : 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls  : ['./reports.component.css'],
    providers  : [ReportForm, ReportsService]
})
export class ReportsComponent implements OnInit {
    public form: FormGroup = null;
    public submit: boolean;
    public report: Report = new Report();
    @Input() car: Car;

    constructor(private reportForm: ReportForm, private reportsService: ReportsService) {
    }

    ngOnInit() {
        this.form = this.reportForm.create(this.report);
        this.form.valueChanges
            .map((value) => {
                value.before = moment(value.before).format();
                value.after  = moment(value.after).format();
                return value;
            })
            .subscribe((data) => {
                this.report.before = data.before;
                this.report.after  = data.after;
                this.submit        = false;
            });
    }

    public onSubmit() {
        this.submit = true;

        this.reportsService.get(this.car, this.report).subscribe(pdf => {
            console.log(pdf);
        });
    }
}
