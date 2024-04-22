import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {
data:any;

constructor(private api:ProjectService,private dialog:MatDialog){}

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

getClientsByStatus(status:any){}

}
