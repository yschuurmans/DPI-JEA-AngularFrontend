import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../P2PMessaging/domain/message';
import {MessageService} from '../../../P2PMessaging/service/message.service';
import {Envelope} from '../../../P2PMessaging/domain/envelope';
import {MessageContent} from '../../../P2PMessaging/domain/message-content';
import {Guid} from 'guid-typescript';

@Component({
  selector: 'app-message-post',
  templateUrl: './message-post.component.html',
  styleUrls: ['./message-post.component.css']
})
export class MessagePostComponent implements OnInit {

  @Input() target: string;
  @Input() sender: string;

  messageText: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {

  }

  sendMessage() {
    console.log('sending message');
    const messageContent = new MessageContent(this.messageText);
    const message = new Message(Guid.create().toString() , this.target , JSON.stringify(messageContent));
    const envelope = new Envelope(this.sender, JSON.stringify(message));

    this.messageService.postMessage(envelope).subscribe(
        x => this.messageSuccessfullyPosted()
      );

    }

  private messageSuccessfullyPosted() {
    this.messageText = '';
  }
}
