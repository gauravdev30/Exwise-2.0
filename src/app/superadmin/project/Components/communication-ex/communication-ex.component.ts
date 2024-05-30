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
  styleUrl: './communication-ex.component.css',
})
export class CommunicationExComponent implements OnInit {
  isCpoc: boolean = false;
  isLoading: boolean = false;
  messages: any = [];
  newMessage = '';
  hover: boolean = false;
  senderMsg: any;
  document: any;
  selectedfile: any;
  constructor(private service: ProjectService) {}
  ngOnInit(): void {
    this.isCpoc = sessionStorage.getItem('isCpoc') == 'true';
    this.getChats();
  }
  getChats() {
    this.isLoading = true;
    this.service
      .communicationByClientId(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log(res);
        this.senderMsg = res.data;
        this.messages = this.senderMsg.map((val: any) => {
          return { text: val.msg, type: val.senderType, id: val.id};
        });
      });
  }
  sendMessage(event?: KeyboardEvent) {
    if (event) {
      event.preventDefault(); // Prevents the default action (e.g., form submission)
    }

    if (this.newMessage.trim() !== '') {
      this.messages.push({
        text: this.newMessage.trim(),
        type: 'sent',
        doc: this.selectedfile.name,
      });

      if (this.isCpoc == true) {
        console.log('cpoc');

        const obj = {
          clientId: sessionStorage.getItem('ClientId'),
          createdDate: new Date(),
          doc: this.document,
          msg: this.newMessage,
          receiverId: 0,
          senderId: JSON.parse(
            sessionStorage.getItem('currentLoggedInUserData')!
          ).id,
          senderType: 'sent',
        };
        this.service.createCommunication(obj).subscribe((res: any) => {
          console.log(res);
          this.selectedfile = '';
          this.getChats();
          this.newMessage = '';
        });
      } else {
        console.log('team Ex');
        const obj = {
          clientId: sessionStorage.getItem('ClientId'),
          createdDate: new Date(),
          doc: this.document,
          msg: this.newMessage,
          receiverId: 0,
          senderId: JSON.parse(
            sessionStorage.getItem('currentLoggedInUserData')!
          ).id,
          senderType: 'received',
        };
        this.service.createCommunication(obj).subscribe((res: any) => {
          console.log(res);
          this.getChats();
          this.newMessage = '';
          this.selectedfile=''
        });
      }
    }
  }

  onProfile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0]; // Get the selected file

    this.selectedfile = inputElement?.files?.[0];
    console.log(this.selectedfile);
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
      this.service.saveeDoc(formData).subscribe((res: any) => {
        this.document = res;
     
        console.log(res);
      });
    }
  }

  deleteClient(id: number) {
    console.log('Delete client', id);
    this.service.deleteCommunication(id).subscribe((res: any) => {
      console.log(res);
    });
  }
}
