export interface IMotochasFilter {
    reached: boolean;
    term: number;
    date: string;
}

export class MotochasFilter implements IMotochasFilter {
    public reached = false;
    public term: number;
    public date: string;
}
