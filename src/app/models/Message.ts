import {IMessage} from './interface/IMessage';
export class Message implements IMessage {
    title: string = null;
    text: string = null;
    show: boolean = null;
}
