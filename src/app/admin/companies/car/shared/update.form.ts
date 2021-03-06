import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Car } from '../../../../shared/models/car.model';

@Injectable()
export class CarUpdateForm {
    private form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public create(car: Car) {
        this.form = this.fb.group({
            id            : [car.id, Validators.required],
            model_id      : [car.model_id, Validators.required],
            name          : [car.name, Validators.required],
            subdivision_id: [car.subdivision_id, Validators.required]
        });

        return this.form;
    }
}
