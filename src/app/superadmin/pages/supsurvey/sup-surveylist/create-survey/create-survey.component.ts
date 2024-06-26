import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyApiService } from '../../../../project/Components/survey/service/survey-api.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css',
})
export class CreateSurveyComponent implements OnInit {
  step = 1;
  // stages: any[] = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
  selectedStage: any;
  selecetdSubPhase: any;
  subphaseList: any;
  stagesList: any;
  stageSelection: boolean = true;
  subphaseSelection: boolean = true;
  surveyID: any;
  subphasename: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateSurveyComponent>,
    private api: SurveyApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.surveyID = data.id;
  }

  ngOnInit(): void {
    console.log(this.surveyID);
    this.getStagesBySUrveyID();
  }

  getAllSubphases() {
    this.api.getAllSubPhasesList().subscribe((res) => {
      if (res.success) {
        this.subphaseList = res.data;
      }
    });
  }

  getStagesBySUrveyID() {
    this.api.getStageBySurveyID(this.surveyID).subscribe((res: any) => {
      console.log(res);
      this.stagesList = res.data;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  next() {
    this.dialogRef.close();
    console.log(this.subphasename);
    console.log(this.selectedStage);

    this.router.navigate(['superadmin/assign-question-to-survey'], {
      queryParams: {
        stage: this.selectedStage,
        subPhase: this.subphasename,
      },
    });
  }

  onStageChange(event: any) {
    this.selectedStage = event.target.value;
    console.log(this.selectedStage);
  }
}
