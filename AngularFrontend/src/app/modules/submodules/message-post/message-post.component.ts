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

  @Input() addMessage: Function;
  @Input() updateMessage: Function;

  @Input() target: string;
  @Input() sender: string;

  messageText: string;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {

  }

  sendMessage() {
    console.log('sending message');
    this.messageService.sendMessage(this.sender, this.target, this.messageText).subscribe(msg=> {
      console.log('delivery status: ' + msg);

      this.addMessage(msg);
    });
  }

  private messageSuccessfullyPosted() {
    this.messageText = '';
  }
}
