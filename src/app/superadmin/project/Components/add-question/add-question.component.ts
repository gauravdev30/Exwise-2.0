import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionpopupComponent } from './questionpopup/questionpopup.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  selectedOption: string = 'mcq'; 
  showContent: any = '';
  enteredQuestions: string[] = [];
  questionText: string = '';
  selectAllChecked = false;
  options = [
    { label: 'Strongly agree', checked: false },
    { label: 'Agree', checked: false },
    { label: 'Neither agree', checked: false },
    { label: 'Strongly disagree', checked: false },
    { label: 'Disagree', checked: false },
    { label: 'other', checked: false }
  ];

  dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

  constructor(private dialog:MatDialog){}

  updateSelection(value:string) {
    this.selectedOption=value;
  }


  toggleSelectAll() {
    for (const option of this.options) {
      option.checked = this.selectAllChecked;
    }
  }

  updateSelectAll() {
    if (this.options.every(option => option.checked)) {
      this.selectAllChecked = true;
    } else {
      this.selectAllChecked = false;
    }
  }

  showContainer(event: any) {
    const value = event.target.value;
    this.showContent = value;
  }

  addQuestion() {
    console.log('skjhv')
    if (this.questionText.trim() !== '') {
      this.enteredQuestions.unshift(this.questionText);
      this.questionText = '';
    }
  }

  removeQuestion(index: number) {
    this.enteredQuestions.splice(index, 1);
  }
  

  openPopup(): void {
    const dialogRef = this.dialog.open(QuestionpopupComponent, {
      width: '450px',
      height: '200px',
      disableClose: true,
      data: { name: 'create-user'}
    });
  }

}
