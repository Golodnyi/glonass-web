export interface IBaseEngine {
    id: number;
    name: string;
    model_id: number;
    sensors_config: {};
    esn: string;
}

export class BaseEngine implements IBaseEngine {
    public id: number;
    public name: string;
    public model_id: number;
    public sensors_config: {};
    public company_id: number;
    public esn: string;
}
