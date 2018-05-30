import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {environment} from '../../../environments/environment.prod';

const WEBSOCKETURL = 'ws://' + environment.urlMessageServer + '/ws/subscribe';

@Injectable()
export class SocketService {

  private serverMessages: string[];

  private wsMessaging: WebSocket;

  constructor() {
    console.log('OPENING CONNECTION');
    this.wsMessaging = new WebSocket(WEBSOCKETURL);

    console.log('AWAITING CONNECTION');
    this.wsMessaging.onopen = (() => {
      console.log('Connection is now open');
    });
  }

  subscribe(username: string) {

    this.wsMessaging.onopen = (() => {
      console.log('subscribing to messages to:' + username);
      this.wsMessaging.send(username);
    });
    console.log('subscribed to messages to: ' + username);
    return Observable.create(
      (observer: Observer<MessageEvent>) => {
        this.wsMessaging.onmessage = observer.next.bind(observer);
        this.wsMessaging.onerror = observer.error.bind(observer);
        this.wsMessaging.onclose = observer.complete.bind(observer);
      }
    );

  }
}
