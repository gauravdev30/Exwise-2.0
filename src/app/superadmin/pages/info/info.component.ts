import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import dayjs from 'dayjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  items:any;
  isPopupOpen: boolean=false;
  surveyList:any[] = [];
  

  constructor(private dialogRef: MatDialogRef<InfoComponent>,@Inject(DIALOG_DATA) public data: {name: string,id:number}, private router:Router,private route: ActivatedRoute,private service:ProjectService){}

  onClose(): void {
    this.dialogRef.close();
  }

  next(){
    this.dialogRef.close();
  }

ngOnInit(): void {

console.log(this.data.id);
  this.service.getSurveyByID(this.data.id).subscribe({
    next: (res: any) => {
      this.surveyList = res.data.surveyWithDetailResponseDto.dto.map((val:any)=>({
        surveyName:res.data.surveyWithDetailResponseDto.surveyName,
        startDate:dayjs(res.data.assignmentToCLient.startDate).format('DD/MM/YYYY'),
        surveyStage:val.stageName,
        surveyStatus:res.data.assignmentToCLient.status
      }));
    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => {},
  });
}

togglePopup() {
  this.isPopupOpen = !this.isPopupOpen;
}

openPopup(id:any): void {
  // const dialogRef = this.dialog.open(InfoComponent, {
  //   width: '750px',
  //   height: '500px',
  //   disableClose: true,
  //   data: { name: 'Survey List',id:id },
  // });

  // dialogRef.afterClosed().subscribe((result) => {
  //   console.log('The popup was closed');
  //   this.router.navigate(['superadmin/info'], {
  //     relativeTo: this.route,
  //   });
  // });
}


openMenu(event: MouseEvent) {
  event.stopPropagation();
}

editSurvey(clientId: any) {
 
}

deleteSurvey(clientId: any) {
  
}

getClientsByStatus(status: any) {
 
}

}

//http://localhost:4200/auth/userlogin
//http://localhost:4200/auth