import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../../project/Components/add-question/add-question.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-supquestion-list',
  templateUrl: './supquestion-list.component.html',
  styleUrl: './supquestion-list.component.css'
})
export class SupquestionListComponent {
  data:any;
  mcqdescriptive:any;
  descriptive:any;
  mcq:any;
  page:any = 1;

  constructor(private api:ProjectService,private dialog:MatDialog,private tosatr:ToastrService,private service:ApiService){}
  
  ngOnInit(): void {
    this.api.getAllQuestions().subscribe((res)=>{
      if(res.success){
        this.data=res.data;
        console.log(this.data);
        
      }
    })
    
    this.service.getCountQuestions().subscribe((res: any) => {
  
      if (res.success) {
       
        this.mcq = res.data.mcq;
        this.descriptive = res.data.descriptive;
        this.mcqdescriptive = res.data.mcqAndDescriptive;
      } else {
      }
    });

  }

  getAllQues(){
    this.api.getAllQuestions().subscribe((res:any)=>{
      if(res.success){
        this.data=res.data;
        console.log(this.data);
        
      }
    })
  }
  deleteQuestion(id:any){
this.api.deleteQuestion(id).subscribe((res:any)=>{
  console.log(res);
  if(res.message==="Question deleted successfully."){
    this.tosatr.success(res.message);
    this.getAllQues();
    // window.location.reload();
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
  
  getQuestionByStatus(status:any){
    this.api.getQuestionListByStatus(status).subscribe((res:any)=>{
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

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllQues();
  }
}
