import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Message} from '../domain/message';
import {environment} from '../../../environments/environment.prod';
import {Envelope} from '../domain/envelope';

@Injectable()
export class MessageService {

  private sendMessageUrl = 'http://' + environment.urlMessageServer + '/messages/send';  // URL to web api

  constructor(private http: HttpClient) { }

  postMessage(envelope: Envelope): Observable<string> {
    return this.http.post<string>(this.sendMessageUrl, envelope);
  }

}
