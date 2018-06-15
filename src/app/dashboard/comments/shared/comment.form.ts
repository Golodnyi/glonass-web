import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CommentForm {
    private form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public create() {
        this.form = this.fb.group({
            comment   : ['', Validators.required]
        });

        return this.form;
    }
}
