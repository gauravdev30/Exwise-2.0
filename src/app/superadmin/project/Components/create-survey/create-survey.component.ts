import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent {
  step = 1;

  constructor(private dialogRef: MatDialogRef<CreateSurveyComponent>, private router:Router,private route: ActivatedRoute){}

  onClose(): void {
    this.dialogRef.close();
  }

  change(number:any){
    this.step=number;
  }

  next(){
    this.dialogRef.close();
    // setTimeout(() => {
    //   console.log('Executed');
    //   this.router.navigate(['../assign-question-to-survey'], { relativeTo: this.route });
    // }, 5000);
  }

}
