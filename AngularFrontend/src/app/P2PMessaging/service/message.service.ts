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

  sendMessage(sender: string, target: string, msgText: string): Observable<Message> {
    const messageContent = new MessageContent(msgText);
    const message = new Message(Guid.create().toString(), sender, target, JSON.stringify(messageContent));
    const envelope = new Envelope(sender, JSON.stringify(message));
    this.setStoredMessage(message.messageId, message);

    console.log('creating observable');

    return Observable.create(
      (observer: Observer<Message>) => {

        console.log('posting message to gateway');
        this.restMessageService.postMessage(envelope).subscribe(
          msg => {
            message.messageStatus = DeliveryStatus.send;
            observer.next(message);
            this.setStoredMessage(message.messageId, message);
          });

        console.log('checking for arival of message: ' + message.messageId);
        let checksLeft = 5;
        const intervalID = setInterval(() => {
            const currentMsg = this.getStoredMessage(message.messageId);
            if (currentMsg.messageStatus === DeliveryStatus.arived) {
              window.clearInterval(intervalID);
              currentMsg.messageStatus = DeliveryStatus.arived;
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
                toConfirm.messageStatus = DeliveryStatus.arived;
                this.setStoredMessage(message.messageId, toConfirm);
              } else {

                const messageContent: MessageContent = JSON.parse(message.messageContent);
                if (target === message.sender) {
                  observer.next(
                    new DecryptedMessage(
                      message.sender,
                      message.target,
                      message.messageId,
                      messageContent.messageText)
                  );
                }
              }

            } else {
              console.log('message not intended for this user! How did that get here?');
            }
          }
        );
      });
  }

}
