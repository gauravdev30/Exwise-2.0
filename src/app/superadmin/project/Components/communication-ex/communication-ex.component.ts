import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-communication-ex',
  templateUrl: './communication-ex.component.html',
  styleUrl: './communication-ex.component.css'
})
export class CommunicationExComponent {

  messages = [
    { id: 1, text: 'Hello and thank you for visiting MDBootstrap. Please click the video below.', type: 'received' },
    { id: 2, text: 'Thank you, I really like your product.', type: 'sent' }
  ];
  newMessage = '';
  hover: boolean = false;

  constructor(private service: ProjectService) { }
  sendMessage(event?: KeyboardEvent) {
    if (event) {
      event.preventDefault(); // Prevents the default action (e.g., form submission)
    }

    if (this.newMessage.trim() !== '') {
      this.messages.push({ id: 1, text: this.newMessage, type: 'sent' });
      const obj = {
        clientId: sessionStorage.getItem("ClientId"),
        createdDate: new Date(),
        doc: '',
        msg: this.newMessage,
        receiverId: 0,
        senderId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id
      }
      this.service.createCommunication(obj).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  send() {

  }

  // editClient(id: number) {
  //   const obj={
  //     clientId: sessionStorage.getItem("ClientId"),
  //     createdDate: new Date(),
  //     doc: '',
  //     msg: this.newMessage,
  //     receiverId: 0,
  //     senderId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id
  //   }
  //   console.log('Edit client', id);
  //   this.service.updateCommunication(id,obj).subscribe((res:any)=>{console.log(res);
  //   })
  // }

  deleteClient(id: number) {
    console.log('Delete client', id);
    this.service.deleteCommunication(id).subscribe((res: any) => {
      console.log(res);
    })
  }
}
