import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SurveyCreateComponent } from '../../../project/Components/survey/survey-list/survey-create/survey-create.component';
import { SurveyApiService } from '../../../project/Components/survey/service/survey-api.service';
import { ToastrService } from 'ngx-toastr';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { Router } from '@angular/router';

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
  orderBy: any = 'asc';
  sortBy: any = 'id';
  isLoading:boolean=false;
  constructor(
    private dialog: MatDialog,
    private api: SurveyApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllSurveyTypes();
  }

  getSurveyList() {
    this.isLoading=true;
    this.api
      .getAllSurveyPagination(this.p, this.size, this.orderBy, this.sortBy)
      .subscribe((res) => {
        if (res.success) {
          this.isLoading=false
          // this.surveyList=res.data;
          console.log(res.data);
          this.totalPages = Math.ceil(res.totalItems / this.size);
        }
      });
  }
  getAllSurveyTypes() {
    this.isLoading=true;
    this.api
      .getAllSurveyPagination(this.p, this.size, this.orderBy, this.sortBy)
      .subscribe((res: any) => {
        this.isLoading=false
        this.surveyList = res.data;
        console.log(this.surveyList);
      });
  }
  editSurvey(surveyId: number) {
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '800px',
      height: '530px',
      disableClose: true,
      data: { surveyId: surveyId },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSurveyList();
    });
  }

  deleteSurvey(surveyId: number) {
    this.api.deleteSurveyById(surveyId).subscribe((res) => {
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

  pinSurvey(surveyId: number) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '450px',
      height: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSurveyList();
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
