import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';


interface Attachment {
  name: string;
  url: string;
}

interface Message {
  id: number;
  text: string;
  type: 'received' | 'sent';
  attachments: Attachment[];
}

@Component({
  selector: 'app-communication-ex',
  templateUrl: './communication-ex.component.html',
  styleUrl: './communication-ex.component.css'
})
export class CommunicationExComponent implements OnInit {

  messages:any=[];
  newMessage = '';
  hover: boolean = false;
senderMsg:any;
  constructor(private service: ProjectService) { }
  ngOnInit(): void {
      this.service.communicationByClientId(sessionStorage.getItem("ClientId")).subscribe((res:any)=>{console.log(res);
        this.senderMsg=res.data;
        this.messages =this.senderMsg.map((val:any)=>{
    return {text:val.msg, type: 'sent',id:val.id }
    
  })
      })
  }
  sendMessage(event?: KeyboardEvent) {
    if (event) {
      event.preventDefault(); // Prevents the default action (e.g., form submission)
    }

    if (this.newMessage.trim() !== '') {
      this.messages.push( {text:this.newMessage.trim(), type: 'sent' });
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
