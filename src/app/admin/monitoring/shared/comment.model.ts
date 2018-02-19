export interface IComment {
    id: number;
    car_id: number;
    message: string;
    created_at: string;
    author_id: number;
}

export class Comment implements IComment {
    public id: number;
    public car_id: number;
    public message: string;
    public created_at: string;
    public author_id: number;
}
