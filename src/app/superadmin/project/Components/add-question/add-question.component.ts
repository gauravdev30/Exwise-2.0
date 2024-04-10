import { Component } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  selectedOption: string = 'mcq'; 
  selectAllChecked = false;
  options = [
    { label: 'Strongly agree', checked: false },
    { label: 'Agree', checked: false },
    { label: 'Neither agree', checked: false },
    { label: 'Strongly disagree', checked: false },
    { label: 'Disagree', checked: false },
    { label: 'other', checked: false }
  ];

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
}
