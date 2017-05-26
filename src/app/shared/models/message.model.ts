export interface IMessage {
  title: string;
  text: string;
  show: boolean;
}

export class Message implements IMessage {
  public title: string;
  public text: string;
  public show: boolean;
}
