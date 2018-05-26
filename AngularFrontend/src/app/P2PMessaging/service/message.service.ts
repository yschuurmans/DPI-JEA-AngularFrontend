import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Message} from '../domain/message';

@Injectable()
export class MessageService {

  private sendMessageUrl = 'http://localhost:8090/send/';  // URL to web api

  constructor(private http: HttpClient) { }

  postMessage(topic: String, body: Message): Observable<String> {
    return this.http.post<String>(this.sendMessageUrl + topic, body);
  }

}
