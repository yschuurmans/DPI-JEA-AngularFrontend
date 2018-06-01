import {MessageContent} from './message-content';
import {DeliveryStatus} from './delivery-status.enum';

export class Message {


  constructor(messageId: string, sender: string, target: string, messageContent: string) {
    this.messageId = messageId;
    this.sender = sender;
    this.target = target;
    this.messageContent = messageContent;
    this.messageStatus = DeliveryStatus.local;
  }

  messageId: string;
  sender: string;
  target: string;
  messageContent: string;
  messageStatus: DeliveryStatus;
}
