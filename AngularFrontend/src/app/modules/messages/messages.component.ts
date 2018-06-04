import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MessageListComponent} from '../submodules/message-list/message-list.component';
import {DecryptedMessage} from '../../P2PMessaging/domain/decrypted-message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChildren(MessageListComponent)
  public messageLists: QueryList<MessageListComponent>;
  private messageList: MessageListComponent;

  username: string;
  target: string;
  initialized: boolean;

  ngOnInit() {
    console.log('test');
    this.initialized = false;
  }

  public ngAfterViewInit(): void {
    this.messageLists.changes.subscribe((comps: QueryList <MessageListComponent>) => {
          this.messageList = comps.first;
    });
  }

  initialize() {
    this.initialized = true;
  }

  updateMessage(message: DecryptedMessage) {
    this.messageList.updateMessageList(message);
  }

}
