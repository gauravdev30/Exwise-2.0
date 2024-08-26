import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-surveyresponses',
  templateUrl: './surveyresponses.component.html',
  styleUrls: ['./surveyresponses.component.css']
})
export class SurveyresponsesComponent implements OnInit {

  @Input() surveyResponses: any[] = [];
  surveyassignmentId: any;
  isLoading: boolean = false;
  selectedTab: string = 'MCQ';

  tabsdata: any[] = [
    { name: 'MCQ', clicked: true },
    { name: 'Descriptive', clicked: false }
  ];

  constructor(private dialogRef: MatDialogRef<SurveyresponsesComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private api: ProjectService) {}

  ngOnInit(): void {
    if (this.data) {
      this.surveyassignmentId = this.data.id;
    }
    this.isLoading = true;
    this.api.getAllSurveyResponseDetailsByAssignmentId(this.surveyassignmentId).subscribe({
      next: (res) => {
        this.surveyResponses = res.data;
        this.isLoading = false;
      },
      error: (err) => { console.log(err); this.isLoading = false; },
      complete: () => {}
    });
  }

  getOptions(item: any): string[] {
    console.log(this.surveyResponses)
    return Object.keys(item.optionsWiseCount);
  }

  getMCQResponses(): any[] {
    return this.surveyResponses.filter(item => {
      const questionType = item.question.typeOfQuestion.toLowerCase();
      return questionType === 'mcq' || questionType === 'reasonforexit' || questionType === 'enps' || questionType === 'both';
    });
  }
  

  getDescriptiveResponses(): any[] {
    const allowedTypes = ['descriptive', 'both'];
    return this.surveyResponses.filter(item => 
      allowedTypes.includes(item.question.typeOfQuestion.toLowerCase())
    );
  }
  

  onClose(): void {
    this.dialogRef.close();
  }

  onTabClick(selectedTab: any) {
    this.tabsdata.forEach(tab => tab.clicked = false);
    selectedTab.clicked = true;
    this.selectedTab = selectedTab.name;
  }
}
