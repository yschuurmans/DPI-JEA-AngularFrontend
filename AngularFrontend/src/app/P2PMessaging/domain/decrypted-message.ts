export class DecryptedMessage {
  sender: String;
  target: String;
  messageId: String;
  messageContent: String;


  constructor(sender: String, target: String, messageId: String, messageContent: String) {
    this.sender = sender;
    this.target = target;
    this.messageId = messageId;
    this.messageContent = messageContent;
  }
}
