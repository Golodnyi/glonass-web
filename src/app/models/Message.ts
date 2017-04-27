import { IMessage } from './interface/IMessage';
export class Message implements IMessage {
  title: string;
  text: string;
  show: boolean;
}
