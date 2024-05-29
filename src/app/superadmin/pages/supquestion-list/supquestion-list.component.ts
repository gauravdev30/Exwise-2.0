import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../../project/Components/add-question/add-question.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';

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
  page:any;
  isLoading:boolean=false;
  constructor(private api:ProjectService,private dialog:MatDialog,private tosatr:ToastrService,private service:ApiService,private servicesearch:SearchService){}
  
  ngOnInit(): void {
    this.isLoading=true
    this.api.getAllQuestions().subscribe((res)=>{
      if(res.success){
        this.isLoading=false
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


    this.servicesearch.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.isLoading=false
          this.getAllQues()
        } else {
          if (res.success) {
            this.isLoading=false
            this.data = res.data;
          } else {
            this.data = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
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
    dialogRef.afterClosed().subscribe(() => {
     this.getAllQues();
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
