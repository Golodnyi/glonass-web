export interface IScheme {
    sensors;
    allowedPorts;
    usedPorts;
    unusedPorts;
    errors;
}

export class Scheme implements IScheme {
    public sensors = [];
    public allowedPorts = [];
    public usedPorts = [];
    public unusedPorts = [];
    public errors = [];
}
