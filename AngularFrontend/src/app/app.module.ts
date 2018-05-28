import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MessagesComponent } from './modules/messages/messages.component';
import {HttpClientModule} from '@angular/common/http';
import { MessageListComponent } from './modules/submodules/message-list/message-list.component';
import { MessagePostComponent } from './modules/submodules/message-post/message-post.component';
import {FormsModule} from '@angular/forms';
import {MessageService} from './P2PMessaging/service/message.service';
import {SocketService} from './P2PMessaging/service/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageListComponent,
    MessagePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [MessageService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
