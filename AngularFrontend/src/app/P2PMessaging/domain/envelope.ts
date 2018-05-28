import {Message} from './message';

export class Envelope {
  constructor(sender: string, message: string) {
    this.sender = sender;
    this.message = message;
  }

  sender: string;
  target: string;
  message: string;
}
