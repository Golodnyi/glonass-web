import { TranslateService } from "@ngx-translate/core";

export interface ISensor {
    id: number;
    name: string;
    port: string;
    sensor_class: string;
    units: string;
}

export class Sensor implements ISensor {
    public id: number;
    public name: string;
    public port: string;
    public sensor_class: string;
    public units: string;
}
