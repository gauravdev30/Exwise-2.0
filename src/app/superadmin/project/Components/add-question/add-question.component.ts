import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuestionpopupComponent } from './questionpopup/questionpopup.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{
  questionForm!: FormGroup;
  selectedOption: string = 'mcq'; 
  showContent: any = '';
  enteredQuestions: string[] = [];
  questionText: string = '';
  selectAllChecked = false;
  selectedDropdown: string = '';
  options = [
    { label: 'Strongly agree', checked: false ,},
    { label: 'Agree', checked: false },
    { label: 'Neither agree', checked: false },
    { label: 'Strongly disagree', checked: false },
    { label: 'Disagree', checked: false },
    { label: 'other', checked: false }
  ];

  dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

  constructor(private dialog:MatDialog,private dialogRef: MatDialogRef<QuestionpopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api:ProjectService,
    private toastr:ToastrService){}

  ngOnInit(): void {
    if(this.data.questionId!==null){
      this.getQuestionById(this.data.questionId);
    }
    this.questionForm = this.fb.group({
      maxWeightage: ['',Validators.required],
      question: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.questionForm.valid){
      const form=this.questionForm.value;
      const obj ={
   
        
          created_date: new Date(),
          loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
          maxWeightage: form.maxWeightage,
          option1:this.options.map(option => option.label),
     
          question: form.question,
          status: "active",
          typeOfQuestion: this.selectedOption
       
      }
      console.log(obj)
      this.api.createQuestion(obj).subscribe((res)=>{
        if(res.message==="Question Answer created successfully."){
          this.toastr.success("Question created successfully.");
          this.onClose();
        }
        else{
          this.toastr.error(res.message);
        }
      })
    }
  }


  onSelectChange(event: any) {
    this.selectedDropdown = event.target.value;
    this.selectAllChecked = false;
    switch (this.selectedDropdown) {
      
      case 'agree':
        this.options = [
          { label: 'Strongly agree', checked: false },
          { label: 'Agree', checked: false },
          { label: 'Neither agree', checked: false },
          { label: 'Strongly disagree', checked: false },
          { label: 'Disagree', checked: false },
          { label: 'other', checked: false }
        ];
        console.log(this.options.map(option => option.label));
        
        break;
      case 'satisfied':
        this.options = [
          { label: 'Very satisfied ', checked: false },
          { label: 'Satisfied', checked: false },
          { label: 'Neither satisfied or dissatisfied', checked: false },
          { label: 'Dissatisfied', checked: false },
          { label: 'Very dissatisfied', checked: false },
          { label: 'other', checked: false }
        ];
        break;
      case 'important':
        this.options = [
          { label: 'Very important', checked: false },
          { label: 'Important', checked: false },
          { label: 'Moderately important', checked: false },
          { label: 'Slightly important', checked: false },
          { label: 'Unimportant', checked: false },
          { label: 'other', checked: false }
        ];
        break;
      default:
        break;
    }
  }

  get selectAllFormControl(): FormControl {
    return this.questionForm.get('selectAllChecked') as FormControl;
  }

  updateSelection(value:string) {
    console.log(value);
    
    this.selectedOption=value;
    console.log(this.selectedOption);
    

  }

  toggleSelectAll() {
    for (const option of this.options) {
      option.checked = !this.selectAllChecked;
    }
    const selectedAll = this.options.every(option=>option.checked)
    if(selectedAll===true){
      this.selectAllChecked = true;
    }
    else{}
}

updateSelectAll() {
  const allOptionsSelected = this.options.every(option => option.checked) && this.selectAllChecked;
  const anyOptionDeselected = this.options.some(option => !option.checked);

  if (allOptionsSelected || anyOptionDeselected) {
      this.selectAllChecked = false;
  } else {
      // this.selectAllChecked = true;
  }
}


  // addQuestion() {
  //   if (this.questionText.trim() !== '') {
  //     this.enteredQuestions.unshift(this.questionText);
  //     this.questionText = '';
  //   }
  // }

  onClose(): void {
    this.dialogRef.close();
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


  getQuestionById(questionId:any){
    this.api.getQuestionById(questionId).subscribe({next:(res)=>{
      console.log(res.data);
      const form = res.data;
      this.questionForm.patchValue({
        maxWeightage: form.maxWeightage,
        question: form.question,
      });
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
