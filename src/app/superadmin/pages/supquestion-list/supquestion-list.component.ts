import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../../project/Components/add-question/add-question.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supquestion-list',
  templateUrl: './supquestion-list.component.html',
  styleUrl: './supquestion-list.component.css'
})
export class SupquestionListComponent {
  data:any;

  constructor(private api:ProjectService,private dialog:MatDialog,private tosatr:ToastrService){}
  
  ngOnInit(): void {
    this.api.getAllQuestions().subscribe((res)=>{
      if(res.success){
        this.data=res.data;
      }
    })
  }
  
  addQuestion(){
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '1100px',
      height: '700px',
      disableClose: true,
    });
  }
  
  getClientsByStatus(status:any){
    this.api.getClientListByStatus(status).subscribe((res:any)=>{
      this.data=null;
      if(res.success){
        this.data=res.data;
        console.log('Client by status=>'+res.data)
        console.log(res.message);
      }
      else{
        this.tosatr.error(res.message);
      }
    },(error)=>{
      this.tosatr.error('Clients Not Found..!!');
    })
  }
}
