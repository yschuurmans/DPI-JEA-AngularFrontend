import {MessageContent} from './message-content';

export class Message {


  constructor(messageId: string, sender: string, target: string, messageContent: string) {
    this.messageId = messageId;
    this.sender = sender;
    this.target = target;
    this.messageContent = messageContent;
  }

  messageId: string;
  sender: string;
  target: string;
  messageContent: string;
}
