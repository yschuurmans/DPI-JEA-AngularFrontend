import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Message} from '../domain/message';
import {environment} from '../../../environments/environment.prod';
import {Envelope} from '../domain/envelope';
import {RestMessageService} from './rest-message.service';
import {Guid} from 'guid-typescript';
import {MessageContent} from '../domain/message-content';

@Injectable()
export class MessageService {

  constructor(private restMessageService: RestMessageService) {
  }

  sendMessage(sender: string, target: string, msgText: string): void {
    const messageContent = new MessageContent(msgText);
    const message = new Message(Guid.create().toString(), sender, target, JSON.stringify(messageContent));
    const envelope = new Envelope(sender, JSON.stringify(message));

    this.restMessageService.postMessage(envelope).subscribe();
  }

}
