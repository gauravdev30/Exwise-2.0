import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-assign-question-to-survey',
  templateUrl: './assign-question-to-survey.component.html',
  styleUrl: './assign-question-to-survey.component.css'
})
export class AssignQuestionToSurveyComponent {
  qas = [
    { question: 'Question 1', answer: 'Answer to question 1' },
    { question: 'Question 2', answer: 'Answer to question 2' },
    { question: 'Question 3', answer: 'Answer to question 3' }
  ];

  isCollapsed: boolean[] = [];
  draggedQa: any = null;

  constructor() {
    this.qas.forEach(() => {
      this.isCollapsed.push(true);
    });
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.qas, event.previousIndex, event.currentIndex);
    this.draggedQa = event.item.data;
  }

  makeCollapse(index: number) {
      this.isCollapsed[index] = !this.isCollapsed[index];
  }
}
