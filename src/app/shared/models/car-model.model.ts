export interface ICarModel {
    id: number;
    name: string;
}

export class CarModel implements ICarModel {
    public id: number;
    public name: string;
}
