import {ISchemeItem} from './schemeItem.model';

export interface IScheme {
    sensors: ISchemeItem[];
    allowedPorts;
    usedPorts;
    unusedPorts;
    errors;
}

export class Scheme implements IScheme {
    public sensors      = [];
    public allowedPorts = [];
    public usedPorts    = [];
    public unusedPorts  = [];
    public errors       = [];
}
