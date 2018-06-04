import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../../../P2PMessaging/service/socket.service';
import {Message} from '../../../P2PMessaging/domain/message';
import {Envelope} from '../../../P2PMessaging/domain/envelope';
import {MessageContent} from '../../../P2PMessaging/domain/message-content';
import {DecryptedMessage} from '../../../P2PMessaging/domain/decrypted-message';
import {MessageService} from '../../../P2PMessaging/service/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  @Input() username: string;
  @Input() target: string;

  messages: DecryptedMessage[] = [];

  ngOnInit() {
    this.subscribeWebsocket();
  }

  subscribeWebsocket() {
    this.messageService.subscribeNewMessages(this.username, this.target).subscribe(
      message => {
        console.log('Received new message');
        this.messages.unshift(message);
      }
    );
  }

  public updateMessageList(message: DecryptedMessage) {
    for (const msg of this.messages) {
      if (msg.messageId === message.messageId) {
        msg.messageStatus = message.messageStatus;
        return;
      }
    }
    this.messages.unshift(message);
  }

}
