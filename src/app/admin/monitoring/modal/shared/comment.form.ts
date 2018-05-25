import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentForm {
    private form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public create() {
        this.form = this.fb.group({
            message: [''],
        });

        return this.form;
    }
}
