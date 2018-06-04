import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../../P2PMessaging/domain/message';
import {MessageService} from '../../../P2PMessaging/service/message.service';
import {Envelope} from '../../../P2PMessaging/domain/envelope';
import {MessageContent} from '../../../P2PMessaging/domain/message-content';
import {Guid} from 'guid-typescript';
import {DecryptedMessage} from '../../../P2PMessaging/domain/decrypted-message';
import {DeliveryStatus} from '../../../P2PMessaging/domain/delivery-status.enum';

@Component({
  selector: 'app-message-post',
  templateUrl: './message-post.component.html',
  styleUrls: ['./message-post.component.css']
})
export class MessagePostComponent implements OnInit {

  @Output() messageUpdate = new EventEmitter<DecryptedMessage>();

  @Input() target: string;
  @Input() sender: string;

  messageText: string;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {

  }

  sendMessage() {
    this.messageService.sendMessage(this.sender, this.target, this.messageText).subscribe(msg => {

      this.messageUpdate.next(msg);

    });
    this.messageText = '';
  }
}
