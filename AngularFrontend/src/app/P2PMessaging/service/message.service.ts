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

@Injectable()
export class MessageService {

  constructor(private restMessageService: RestMessageService, private socketService: SocketService) {
  }

  sendMessage(sender: string, target: string, msgText: string): void {
    const messageContent = new MessageContent(msgText);
    const message = new Message(Guid.create().toString(), sender, target, JSON.stringify(messageContent));
    const envelope = new Envelope(sender, JSON.stringify(message));

    this.restMessageService.postMessage(envelope).subscribe();
  }

  subscribeNewMessages(username: string, target: string): Observable<DecryptedMessage> {
    return Observable.create(
      (observer: Observer<DecryptedMessage>) => {

        this.socketService.subscribe(username).subscribe(
          msg => {
            const envelope: Envelope = JSON.parse(msg.data);
            if (username === envelope.target) {
              const message: Message = JSON.parse(envelope.message);
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

            } else {
              console.log('message not intended for this user! How did that get here?');
            }
          }
        );
      });
  }

}
