import { ISchemeModel, SchemeModel } from './schemeModel.model';

export interface ISchemeItem {
    id: number;
    model: SchemeModel;
    name: string;
}

export class SchemeItem implements ISchemeItem {
    id: number;
    model: SchemeModel = new SchemeModel();
    name: string;
}
