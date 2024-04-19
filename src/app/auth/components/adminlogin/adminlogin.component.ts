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
export class AdminloginComponent  implements OnInit{
  loginForm!: FormGroup;
  showPassword = false;
  show = '';
  userId:number=1;
  fieldTextType:any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr:ToastrService,
    private router:Router
  ) {}
  myFunction() {
    this.fieldTextType = !this.fieldTextType;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const obj = {
        email: form.email,
        password: form.password,
      };

      console.log(obj);

      this.apiService.authLogin(obj).subscribe({
        next: (res: any) => {
          console.log(res);
          
          if(res.success){
            sessionStorage.setItem('currentLoggedInUserData', JSON.stringify(res.data));
            this.toastr.success('Login Successful....!!');
            if(this.userId==1){
              this.router.navigate(['/superadmin']);
            }
            else if(this.userId==2){
              this.router.navigate(['/superadmin/project']);
            }
          }
          else if(res.message==="Password wrong!! "){
            this.toastr.error(res.message);
          }
        },
        error: (error: any) => {
          this.toastr.error('Email ID not Found')
          console.error('Authentication error:', error);
        },
      });
    }
    else{
      this,this.loginForm.markAllAsTouched();
    }
}

changeTextToPassword(): void {
  this.showPassword = !this.showPassword;
  this.show = !this.showPassword ? 'text' : 'password';
}

}
