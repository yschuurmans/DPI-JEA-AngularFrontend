import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Message} from '../domain/message';
import {environment} from '../../../environments/environment.prod';
import {Envelope} from '../domain/envelope';
import {RestMessageService} from './rest-message.service';
import {Guid} from 'guid-typescript';
import {MessageContent} from '../domain/message-content';
import {DecryptedMessage} from '../domain/decrypted-message';
import {SocketService} from './socket.service';
import {Observer} from 'rxjs/Observer';
import {DeliveryStatus} from '../domain/delivery-status.enum';

@Injectable()
export class MessageService {

  constructor(private restMessageService: RestMessageService, private socketService: SocketService) {
  }

  sendMessage(sender: string, target: string, msgText: string): Observable<DecryptedMessage> {
    const messageContent = new MessageContent(msgText);
    const message = new Message(Guid.create().toString(), sender, target, JSON.stringify(messageContent));
    const envelope = new Envelope(sender, JSON.stringify(message));
    this.setStoredMessage(message.messageId, message);


    return Observable.create(
      (observer: Observer<DecryptedMessage>) => {

        console.log('sending message with id: ' + message.messageId);
        this.restMessageService.postMessage(envelope).subscribe(
          msg => {
            message.messageStatus = DeliveryStatus.send;
            observer.next(this.messageToDecryptedMessage(message));
            this.setStoredMessage(message.messageId, message);
          });

        let checksLeft = 5;
        const intervalID = setInterval(() => {
            const currentMsg = this.getStoredMessage(message.messageId);
            if (currentMsg.messageStatus === DeliveryStatus.arrived) {
              window.clearInterval(intervalID);
              currentMsg.messageStatus = DeliveryStatus.arrived;
              observer.next(currentMsg);
              this.removeStoredMessage(currentMsg.messageId);
            }


            if (checksLeft > 0) {
              checksLeft = checksLeft - 1;
            } else {
              window.clearInterval(intervalID);

              this.sendMessage(sender, target, msgText).subscribe(msg2 => {
                observer.next(msg2);
              });
            }

          },
          1000);
      });
  }

  getStoredMessage(messageGuid: string): Message {
    return JSON.parse(localStorage.getItem('msg_' + messageGuid));
  }

  setStoredMessage(messageGuid: string, message: Message): void {
    localStorage.setItem('msg_' + messageGuid, JSON.stringify(message));
  }

  removeStoredMessage(messageGuid: string): void {
    localStorage.removeItem('msg_' + messageGuid);
  }

  messageToDecryptedMessage(message: Message) {
    const messageContent: MessageContent = JSON.parse(message.messageContent);
    return new DecryptedMessage(
      message.sender,
      message.target,
      message.messageId,
      messageContent.messageText,
      message.messageStatus);
  }

  subscribeNewMessages(username: string, target: string): Observable<DecryptedMessage> {
    return Observable.create(
      (observer: Observer<DecryptedMessage>) => {

        this.socketService.subscribe(username).subscribe(
          msg => {
            const envelope: Envelope = JSON.parse(msg.data);
            if (username === envelope.target) {
              const message: Message = JSON.parse(envelope.message);

              if (message.messageContent === 'confirm') {
                console.log('received confirm message for: ' + message.messageId);
                const toConfirm = this.getStoredMessage(message.messageId);
                toConfirm.messageStatus = DeliveryStatus.arrived;
                this.setStoredMessage(message.messageId, toConfirm);
              } else {
                if (target === message.sender) {
                  observer.next(this.messageToDecryptedMessage(message));
                  this.sendConfirmMessage(message);
                }
              }

            } else {
              console.log('message not intended for this user! How did that get here?');
            }
          }
        );
      });
  }

  private sendConfirmMessage(message: Message) {
    const msg: Message = new Message(message.messageId, null, null, 'confirm');
    const env: Envelope = new Envelope(message.target, JSON.stringify(msg));


    console.log('posting confirm message to gateway for: ' + msg.messageId);
    this.restMessageService.postMessage(env).subscribe();
  }

}
