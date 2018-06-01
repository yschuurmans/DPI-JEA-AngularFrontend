import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {Message} from '../../P2PMessaging/domain/message';
import {MessageListComponent} from '../submodules/message-list/message-list.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @ViewChild(MessageListComponent) private messageList: MessageListComponent;

  constructor() { }


  username: string;
  target: string;
  initialized: boolean;

  ngOnInit() {
    console.log('test');
    this.initialized = false;
  }

  initialize() {
    this.initialized = true;
  }

  addMessage(message: Message) {
    this.messageList.addMessage(message);
  }

  updateMessage(message: Message) {

  }

}
