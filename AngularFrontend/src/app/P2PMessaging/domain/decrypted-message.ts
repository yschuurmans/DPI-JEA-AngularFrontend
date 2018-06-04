import {DeliveryStatus} from './delivery-status.enum';

export class DecryptedMessage {
  sender: String;
  target: String;
  messageId: String;
  messageContent: String;
  messageStatus: DeliveryStatus;


  constructor(sender: String, target: String, messageId: String, messageContent: String, messageStatus: DeliveryStatus) {
    this.sender = sender;
    this.target = target;
    this.messageId = messageId;
    this.messageContent = messageContent;
    this.messageStatus = messageStatus;
  }
}
