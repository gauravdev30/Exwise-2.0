import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DIALOG_DATA } from '@angular/cdk/dialog';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  items:any;
  isPopupOpen: boolean=false;
  surveyList = [
    {
      id: 1,
      surveyName: 'Survey 1',
      description: 'description',
      status: 'Active'
    },
    {
      id: 2,
      surveyName: 'Survey 2',
      description: 'description',
      status: 'Inactive'
    },
    {
      id: 3,
      surveyName: 'Survey 3',
      description: 'description',
      status: 'Active'
    }
  ];
  

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
      this.items = res.data;
      console.log(res);
      
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
