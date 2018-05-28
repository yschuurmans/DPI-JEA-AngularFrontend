import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('test');
  }

}
