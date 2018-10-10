import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Report } from './report.model';

@Injectable()
export class ReportForm {
    private form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public create(report: Report) {
        this.form = this.fb.group({
            before : [moment(report.before).toDate()],
            after  : [moment(report.after).toDate()],
        });

        return this.form;
    }
}
