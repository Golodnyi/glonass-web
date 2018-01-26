import {SchemeModel} from './schemeModel.model';

export interface ISchemeItem {
    id: string;
    model: SchemeModel;
    name: string;
    limits: any;
}

export class SchemeItem implements ISchemeItem {
    id: string;
    model: SchemeModel = new SchemeModel();
    name: string;
    limits: any        = null;
}
