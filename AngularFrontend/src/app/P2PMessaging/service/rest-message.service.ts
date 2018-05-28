import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment.prod';
import {Envelope} from '../domain/envelope';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RestMessageService {

  private sendMessageUrl = 'http://' + environment.urlMessageServer + '/messages/send';  // URL to web api

  constructor(private http: HttpClient) { }

  postMessage(envelope: Envelope): Observable<string> {
    return this.http.post<string>(this.sendMessageUrl, envelope);
  }
}
