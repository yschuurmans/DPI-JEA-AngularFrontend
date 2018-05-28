import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../../../P2PMessaging/service/socket.service';
import {Message} from '../../../P2PMessaging/domain/message';
import {Envelope} from '../../../P2PMessaging/domain/envelope';
import {MessageContent} from '../../../P2PMessaging/domain/message-content';
import {DecryptedMessage} from '../../../P2PMessaging/domain/decrypted-message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(private socketService: SocketService) {
  }

  @Input() username: string;
  @Input() target: string;

  messages: DecryptedMessage[] = [];

  ngOnInit() {
    this.subscribeWebsocket();
  }

  subscribeWebsocket() {
    this.socketService.subscribe(this.username).subscribe(
      msg => {

        const envelope: Envelope = JSON.parse(msg.data);
        const message: Message = JSON.parse(envelope.message);
        if (this.target === message.target) {
          const messageContent: MessageContent = JSON.parse(message.messageContent);
          const decryptedMessage: DecryptedMessage =
            new DecryptedMessage(
              envelope.sender,
              message.target,
              message.messageId,
              messageContent.messageText);


          console.log('RECEIVED : ');
          console.log(msg.data);
          console.log(messageContent);
          this.messages.unshift(decryptedMessage);
          console.log(this.messages);
        }
      }
    );
  }

}
