export interface ISchemePostItem {
    id: number;
    sensor_id: string;
    sensor_model: string;
    port: string;
    limits: any;
}

export class SchemePostItem implements ISchemePostItem {
    id: number;
    sensor_id: string;
    sensor_model: string;
    port: string;
    limits: any = {};
}
