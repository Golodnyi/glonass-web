export interface IError {
    message: string;
    params: object;
    sources: object;
}

export class Error implements IError {
    public message: string;
    public params: object = {};
    public sources: object = {};
}
