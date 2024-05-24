import { Component } from '@angular/core';


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
export class CommunicationExComponent {
  messages: Message[] = [
    { id: 1, text: 'Hello and thank you for visiting MDBootstrap. Please click the video below.', type: 'received', attachments: [] },
    { id: 2, text: 'Thank you, I really like your product.', type: 'sent', attachments: [] }
  ];
  newMessage = '';
  selectedFiles: File[] = [];
  hover:boolean=false;
  sendMessage() {
    if (this.newMessage.trim() !== '' || this.selectedFiles.length > 0) {
      const newMessageObj: Message = {
        id: this.messages.length + 1,
        text: this.newMessage,
        type: 'sent',
        attachments: this.selectedFiles.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file)
        }))
      };
      this.messages.push(newMessageObj);
      this.newMessage = '';
      this.selectedFiles = [];
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  editClient(id: number) {
    console.log('Edit client', id);
  }

  deleteClient(id: number) {
    console.log('Delete client', id);
  }
}
