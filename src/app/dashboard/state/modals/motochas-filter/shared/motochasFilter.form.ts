import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class MotochasFilterForm {
    private form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public create() {
        this.form = this.fb.group({
            motochas: ['', Validators.required],
        });

        return this.form;
    }
}
