export interface ISchemeModel {
    id: string;
    name: string;
    units: string;
    port: string;
    allowedPorts;
}

export class SchemeModel implements ISchemeModel {
    public id: string;
    public name: string;
    public units: string;
    public port: string;
    public allowedPorts = [];
}
