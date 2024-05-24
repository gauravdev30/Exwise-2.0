import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-communication-ex',
  templateUrl: './communication-ex.component.html',
  styleUrl: './communication-ex.component.css'
})
export class CommunicationExComponent implements OnInit {
  isCpoc:boolean=false;
  messages:any=[    {id: 1, text: 'Hello and thank you for visiting MDBootstrap. Please click the video below.', type: 'received' },
  {id:2, text: 'Thank you, I really like your product.', type: 'sent' }];
  newMessage = '';
  hover: boolean = false;
senderMsg:any;
selectedFiles: File[] = [];
  constructor(private service: ProjectService) { }
  ngOnInit(): void {
    this.isCpoc=sessionStorage.getItem("isCpoc")=='true';
  this.getChats();
  }
  getChats(){
    this.service.communicationByClientId(sessionStorage.getItem("ClientId")).subscribe((res:any)=>{console.log(res);
      this.senderMsg=res.data;
      this.messages =this.senderMsg.map((val:any)=>{
  return {text:val.msg, type: val.senderType,id:val.id }
  
})
    })
  }
  sendMessage(event?: KeyboardEvent) {
    if (event) {
      event.preventDefault(); // Prevents the default action (e.g., form submission)
    }

    if (this.newMessage.trim() !== '') {
      this.messages.push( {text:this.newMessage.trim(), type: 'sent' });

  if(
    this.isCpoc==true
  ){
console.log("cpoc");

    const obj = {
      clientId: sessionStorage.getItem("ClientId"),
      createdDate: new Date(),
      doc: '',
      msg: this.newMessage,
      receiverId: 0,
      senderId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      senderType: "sent"
    }
    this.service.createCommunication(obj).subscribe((res: any) => {
      console.log(res);
      this.getChats();
      this.newMessage=''
    })
  }else{
    console.log("team Ex");
    const obj = {
      clientId: sessionStorage.getItem("ClientId"),
      createdDate: new Date(),
      doc: '',
      msg: this.newMessage,
      receiverId: 0,
      senderId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      senderType: "received"
    }
    this.service.createCommunication(obj).subscribe((res: any) => {
      console.log(res);
      this.getChats();
      this.newMessage=''
    })
  }
    }
  }

  send() {

  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  deleteClient(id: number) {
    console.log('Delete client', id);
    this.service.deleteCommunication(id).subscribe((res: any) => {
      console.log(res);
    })
  }
}
