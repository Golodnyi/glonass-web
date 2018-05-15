import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subdivision } from '../../../../shared/models/subdivision.model';

@Injectable()
export class SubdivisionUpdateForm {
    private form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public create(subdivision: Subdivision) {
        this.form = this.fb.group({
            name: [subdivision.name, Validators.required]
        });

        return this.form;
    }
}
