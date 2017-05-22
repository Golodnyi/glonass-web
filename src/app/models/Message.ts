export interface IMessage {
  title: string;
  text: string;
  show: boolean;
}

export class Message implements IMessage {
  title: string;
  text: string;
  show: boolean;
}
