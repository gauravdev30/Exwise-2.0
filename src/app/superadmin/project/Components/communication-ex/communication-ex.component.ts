import { Component } from '@angular/core';

@Component({
  selector: 'app-communication-ex',
  templateUrl: './communication-ex.component.html',
  styleUrl: './communication-ex.component.css'
})
export class CommunicationExComponent {
  messages = [
    {id: 1, text: 'Hello and thank you for visiting MDBootstrap. Please click the video below.', type: 'received' },
    {id:2, text: 'Thank you, I really like your product.', type: 'sent' }
  ];
  newMessage = '';
  hover:boolean=false;

  sendMessage(event?: KeyboardEvent) {
    if (event) {
      event.preventDefault(); // Prevents the default action (e.g., form submission)
    }

    if (this.newMessage.trim() !== '') {
      this.messages.push({id:1, text: this.newMessage, type: 'sent' });
      this.newMessage = '';
    }
  }

  editClient(id: number) {
    console.log('Edit client', id);
  }

  deleteClient(id: number) {
    console.log('Delete client', id);
  }
}
