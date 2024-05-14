import { Component } from '@angular/core';

@Component({
  selector: 'app-communication-ex',
  templateUrl: './communication-ex.component.html',
  styleUrl: './communication-ex.component.css'
})
export class CommunicationExComponent {
  messages: { text: string, type: string }[] = [
    { text: 'Hello and thank you for visiting MDBootstrap. Please click the video below.', type: 'received' },
    { text: 'Thank you, I really like your product.', type: 'sent' }
  ];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, type: 'sent' });
      this.newMessage = '';
    }
  }
}
