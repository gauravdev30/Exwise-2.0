import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SurveyCreateComponent } from '../../../project/Components/survey/survey-list/survey-create/survey-create.component';
import { SurveyApiService } from '../../../project/Components/survey/service/survey-api.service';
import { ToastrService } from 'ngx-toastr';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-sup-surveylist',
  templateUrl: './sup-surveylist.component.html',
  styleUrl: './sup-surveylist.component.css',
})
export class SupSurveylistComponent implements OnInit {
  surveyList: any;
  p: number = 0;
  page: number = 1;
  totalPages: number = 1;
  size: number = 10;
  orderBy: any = 'desc';
  sortBy: any = 'id';
  isLoading:boolean=false;
  itemPerPage: number = 10;
  totalItems: any;
  constructor(
    private dialog: MatDialog,
    private api: SurveyApiService,
    private toastr: ToastrService,
    private router: Router,
    private searchservice:SearchService
  ) {}

  ngOnInit(): void {
    // this.getAllSurveyTypes(); 
     this.searchservice.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.isLoading=false
          this.getAllSurveyTypes(); 
        } else {
          if (res.success) {
            this.isLoading=false
            this.surveyList = res.data;
          } else {
            this.surveyList = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });

  }

  getSurveyList() {
    this.isLoading=true;
    this.api
      .getAllSurveyPagination(this.page-1, this.size, this.orderBy, this.sortBy)
      .subscribe((res) => {
        if (res.success) {
          this.isLoading=false
          // this.surveyList=res.data;
          console.log(res.data);
          // this.totalPages = Math.ceil(res.totalItems / this.size);
        }
      });
  }
  getAllSurveyTypes() {
    this.isLoading=true;
    this.api
      .getAllSurveyPagination(this.page-1, this.size, this.orderBy, this.sortBy)
      .subscribe({next:(res: any) => {
        console.log(res);
        
        this.isLoading=false
        this.surveyList = res.data;
        this.totalItems=res.totalItems
        console.log(this.surveyList);
      },error:(err:any)=>{console.log(err);
        this.toastr.error(
          'Internal server error'
        );
        this.isLoading=false;
      },complete:()=>{}});
  }
  editSurvey(surveyId: number) {
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '800px',
      height: '530px',
      disableClose: true,
      data: { surveyId: surveyId },
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getSurveyList();
      this.getAllSurveyTypes();
    });
  }


  ondetails(id:any,status:any){
    console.log('test');
    
    let url = this.router.url.replace("superadmin/sup-survey/sup-surveylist", `superadmin/details/${id}/${status}`);
    this.router.navigateByUrl(url);
  }

  deleteSurvey(surveyId: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to delete the records for ${surveyId.survey_name} ?`,
      },
      disableClose:true
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.api.deleteSurveyById(surveyId.id).subscribe((res) => {
          console.log(res);
          window.location.reload();
          if (
            res.message ===
            'Survey type and associated stages deleted successfully.'
          ) {
            this.toastr.success(
              'Survey type and associated stages deleted successfully.'
            );
            window.location.reload();
          }
        });
      }
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllSurveyTypes();
  }
  pinSurvey(surveyId: number) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '450px',
      height: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSurveyList();
      this.getAllSurveyTypes();
    });
  }

  openPopupQuestion(id: any): void {
    const dialogRef = this.dialog.open(CreateSurveyComponent, {
      width: '450px',
      height: '450px',
      disableClose: true,
      data: { name: 'Survey List', id: id },
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.router.navigate(['superadmin/assign-question-to-survey']);
    // });
  }

  onPageChange(pageNumber: number): void {
    this.p = pageNumber;
    this.getSurveyList();
  }
}
