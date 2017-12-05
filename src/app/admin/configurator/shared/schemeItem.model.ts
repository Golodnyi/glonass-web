import { SchemeModel } from './schemeModel.model';

export interface ISchemeItem {
  id: number;
  model: SchemeModel;
  name: string;
  limits: any;
}

export class SchemeItem implements ISchemeItem {
  id: number;
  model: SchemeModel = new SchemeModel();
  name: string;
  limits: any = null;
}
