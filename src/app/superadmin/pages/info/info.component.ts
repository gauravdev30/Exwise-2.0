import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit {
  items: any;
  isPopupOpen: boolean = false;
  surveyList: any[] = [];
  orderBy: any = 'desc';
  page: any = 1;
  size: any = 10;
  sortBy: any = 'id';
  isLoading: boolean = false;
  itemPerPage: number = 10;
  totalItems: number = 10;
  details: any[] = [];

  displayMesg: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<InfoComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(DIALOG_DATA) public data: { name: string; id: number; consultantName:any },

    private service: ProjectService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllSurveyByClientId();
  }
  next() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAllSurveyByClientId();
  }

  getAllSurveyByClientId() {
    this.isLoading = true;
    this.service
      .getAllSurveyByClientID(
        this.data.id,
        this.orderBy,
        this.page - 1,
        this.size,
        this.sortBy
      )
      .subscribe({
        next: (res) => {
          if (res.message === 'Failed to retrieve survey assignments.') {
            this.isLoading = false;
            this.displayMesg = true;
            this.cdr.detectChanges();
          } else {
            this.surveyList = res.data;
            this.isLoading = false;
            console.log(res.totalItems);
            
            // this.totalItems = res.totalItems;
            console.log(this.surveyList);
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.displayMesg = true;
          this.cdr.detectChanges();
        },
        complete: () => {},
      });
  }

  // togglePopup() {
  //   this.isPopupOpen = !this.isPopupOpen;
  // }

  // openMenu(event: MouseEvent) {
  //   event.stopPropagation();
  // }
}
