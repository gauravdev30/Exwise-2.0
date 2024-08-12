import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveyApiService } from '../../project/Components/survey/service/survey-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeleteComponent } from '../delete/delete.component';
import { AddmorequestionComponent } from '../addmorequestion/addmorequestion.component';
import { ProjectService } from '../../project/services/project.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-survey-indetails',
  templateUrl: './survey-indetails.component.html',
  styleUrl: './survey-indetails.component.css'
})
export class SurveyIndetailsComponent implements OnInit {
  stageList: any;
  detailInfo: any;
  id: any;
  status: boolean = false;
  isStatic: any;
  isDisplay: boolean = false;
  subphase: any;
  stages: any;
  subscription!: Subscription;
  activeIcon: string = 'add-circle-outline';
  substageQuestions: any = [];


  constructor(private dialog: MatDialog, private api: SurveyApiService, private tosatr: ToastrService, private activatedroute: ActivatedRoute, private location: Location, private service: ProjectService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((param: any) => {
      console.log(param);
      this.id = param['id']
      this.status = param['status']
      console.log(this.id, this.status);
      this.isStatic = param['status'];
      console.log(this.isStatic)
      this.getSurveyDetailsById();

    });
    this.isDisplay = this.isStatic;

    this.subscription = this.searchService.getSearchKeyword().subscribe((keyword: any) => {
      this.searchQuestion(keyword);
    });
  }


  getSurveyDetailsById() {
    this.api.getSurveyDetailsById(this.id, this.isStatic).subscribe({
      next: (res) => {
        this.detailInfo = res.data;
        console.log(this.detailInfo.dto[0]);
        this.detailInfo.dto[0].clicked = true;
        this.stages = this.detailInfo.dto[0];
        this.subphase = this.detailInfo.dto[0].subphaseWithQuestionAnswerResponseDtos;
        this.substage(this.subphase[0], this.stages.stageName);

      }, error: (err) => { console.log(err) }, complete: () => { }
    })
  }

  searchQuestion(keyword: any) {
    this.api.getSurveyDetailsByIdFilter(this.id, this.isStatic, keyword).subscribe({
      next: (res) => {
        const detailInfo = res.data;
        this.stages = detailInfo.dto[0];
      }, error: (err) => { console.log(err) }, complete: () => { }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // stage(stageDetail: any) {
  //   this.detailInfo.dto.forEach(
  //     (val: any) => (val.clicked = val.stageId == stageDetail.stageId)
  //   );
  //   this.stages = stageDetail;
  //   this.subphase = this.stages.subphaseWithQuestionAnswerResponseDtos;
  // }

  stage(stageDetail: any) {
    this.detailInfo.dto.forEach((val: any) => {
      val.clicked = val.stageId === stageDetail.stageId;
    });

    this.stages = stageDetail;

    this.subphase = this.stages?.subphaseWithQuestionAnswerResponseDtos;
    if (this.subphase.length > 0) {
      this.substage(this.subphase[0], stageDetail.stageName);
    } else {
      this.substageQuestions = [];
    }
  }


  substage(sub: any, stageName: string) {
    this.subphase.forEach(
      (val: any) => (val.clicked = val.subphaseId == sub.subphaseId)
    );
    this.substageQuestions = { ...sub, stageName: stageName };
  }

  change(iconName: string) {
    this.activeIcon = iconName;
  }

  goBack() {
    this.location.back();
  }

  openAddmoreQuestion() {
    const dialogRef = this.dialog.open(AddmorequestionComponent, {
      width: '1200px',
      height: '600px',
      disableClose: true,
      data: this.substageQuestions,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSurveyDetailsById();
    });
  }

  onRemoveQuestion(question: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to remove the question ${question.question} ?`,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const subphaseId = this.substageQuestions?.subphaseId;
      const curruntQuetionIds = this.substageQuestions?.questionsAnswerResponseDtos?.map((q: any) => q?.questionId);
      if (result.action == 'ok') {
        const questionIndex = this.substageQuestions?.questionsAnswerResponseDtos?.findIndex((q: any) => q.questionId === question?.questionId);

        if (questionIndex > -1) {
          this.substageQuestions?.questionsAnswerResponseDtos?.splice(questionIndex, 1);
        }

        const idIndex = curruntQuetionIds?.indexOf(question?.questionId);
        if (idIndex > -1) {
          curruntQuetionIds.splice(idIndex, 1);
        }
        const obj = {
          surveyQuestionId: curruntQuetionIds
        }
        this.service.updateSurveyQuestions(subphaseId, obj).subscribe({
          next: (res: any) => {
            console.log('Questions submitted successfully', res);
            this.tosatr.success(res.message);
            // this.getSurveyDetailsById();
          },
          error: (err: any) => console.log('Error submitting questions', err)
        });
      }
    });
  }

}
