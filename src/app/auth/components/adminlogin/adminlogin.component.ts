import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../authservice/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  show = '';
  displayMsg: any;
  userId: number = 1;
  fieldTextType: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  myFunction() {
    this.fieldTextType = !this.fieldTextType;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const email = form.email;
      const password = form.password;
      this.apiService.authLoginwithoutJwt(email, password).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'Current logged in Employee') {
            sessionStorage.setItem('currentLoggedInUserData', JSON.stringify(res.data));
            const clientId = res.data.clientId;
            if (res.data.typeOfUser === 0) {
              this.router.navigate(['/superadmin']);
              this.toastr.success('Congratulations,your account has been login successfully.!!');
              sessionStorage.setItem('isCpoc', 'false');
            }

          }
          else if (res.message === "Password wrong!!") {
            this.toastr.error('Sorry, your password is incorrect. Please double-check your password.');
            this.displayMsg = 'Sorry, your password is incorrect. Please double-check your password.';
          }
          else if (res.message === "Email not found!!") {
            this.toastr.error('The email account that you tried to reach does not exist.');
            this.displayMsg = 'The email account that you tried to reach does not exist.';
          }
        },
        error: (error: any) => {
          console.error('Authentication error:', error);
        },
      });
    }
    else {
      this, this.loginForm.markAllAsTouched();
    }
  }


  changeTextToPassword(): void {
    this.showPassword = !this.showPassword;
    this.show = !this.showPassword ? 'text' : 'password';
  }
}
