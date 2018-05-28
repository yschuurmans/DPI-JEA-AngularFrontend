import {MessageContent} from './message-content';

export class Message {


  constructor(messageId: string, target: string, message: string) {
    this.messageId = messageId;
    this.target = target;
    this.messageContent = message;
  }

  messageId: string;
  target: string;
  messageContent: string;
}
