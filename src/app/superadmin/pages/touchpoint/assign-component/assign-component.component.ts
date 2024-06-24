import { Component, OnInit } from '@angular/core';
import { TouchpointService } from '../../../services/touchpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-component',
  templateUrl: './assign-component.component.html',
  styleUrl: './assign-component.component.css',
})
export class AssignComponentComponent {
  result: any;

  questions: any[] = [];
  isCollapsed: boolean[] = [];
  isDraggedCollapsed: boolean[] = [];
  dragedQuestion: any[] = [];
  touchpointSubPhase: any;
  touchpointStageName: any;
  touchpointStageId: any;
  id: any;

  constructor(
    private api: TouchpointService,
    private route: ActivatedRoute,
    private tostr: ToastrService,
    private router: Router
  ) {
    // this.qas.forEach(() => {
    //   this.isCollapsed.push(true);
    //   this.isDraggedCollapsed.push(true);
    // });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.touchpointStageId = params['touchpointStageId'];
      this.touchpointStageName = params['touchpointStageName'];
      this.touchpointSubPhase = params['touchpointSubPhase'];
      this.id = params['id'];
      console.log(this.touchpointStageId);
      console.log(this.touchpointSubPhase);
      console.log(this.id);
    });
    this.api.getAllComponents().subscribe((res: any) => {
      if (res.success) {
        this.questions = res.data;
        console.log(this.questions);
      }
    });
  }

  makeCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  makeDraggedCollapse(index: number) {
    this.isDraggedCollapsed[index] = !this.isDraggedCollapsed[index];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.dragedQuestion);
    this.result = this.dragedQuestion.map((data: any) => data.id);
    console.log(this.result);
  }

  onSubmit() {
    const obj = {
      createdDate: new Date(),
      loggedUserId: JSON.parse(
        sessionStorage.getItem('currentLoggedInUserData')!
      ).id,
      touchpointStageId: this.touchpointStageId,
      subPhaseName: this.touchpointSubPhase,
      realityComponent: this.result,
    };
    console.log(obj);
    this.api
      .updateTouchpointAndRealitySubphaseAssignment(this.id, obj)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'TouchPointSubPhases created successfully.') {
            this.tostr.success('Components assign to reality successfully.');
            this.router.navigate(['superadmin/touchpoint']);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
