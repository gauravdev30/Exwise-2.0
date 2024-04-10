import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../authservice/api.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent  implements OnInit{
  loginForm!: FormGroup;
  showPassword = false;
  show = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    console.log('heated', this.loginForm.value);
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const obj = {
        emailId: form.emailId,
        password: form.password,
      };

      console.log(obj);

      this.apiService.authLogin(obj).subscribe({
        next: (res: any) => {
          console.log('Authentication response:', res);
        },
        error: (error: any) => {
          console.error('Authentication error:', error);
        },
      });
    }
}

changeTextToPassword(): void {
  this.showPassword = !this.showPassword;
  this.show = !this.showPassword ? 'text' : 'password';
}

}
