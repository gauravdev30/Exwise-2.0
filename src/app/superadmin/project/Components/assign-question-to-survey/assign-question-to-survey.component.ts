import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-assign-question-to-survey',
  templateUrl: './assign-question-to-survey.component.html',
  styleUrls: ['./assign-question-to-survey.component.css'],
})
export class AssignQuestionToSurveyComponent {
  qas = [
    { question: 'Question 1', answer: 'Answer to question 1' },
    { question: 'Question 2', answer: 'Answer to question 2' },
    { question: 'Question 3', answer: 'Answer to question 3' }
  ];

  isCollapsed: boolean[] = [];
  dragedQuestion: any[] = [];

  constructor() {
    this.qas.forEach(() => {
      this.isCollapsed.push(true);
    });
  }


  makeCollapse(index: number) {
      this.isCollapsed[index] = !this.isCollapsed[index];
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
