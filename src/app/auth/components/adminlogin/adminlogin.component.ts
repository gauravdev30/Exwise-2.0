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
      password: ['', [Validators.required]],
    });
  }

  submit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const  email= form.email;
      const  password= form.password;
      this.apiService.authLoginwithoutJwt(email,password).subscribe({
        next: (res: any) => {
          console.log(res);
          if(res.success){
            sessionStorage.setItem('currentLoggedInUserData', JSON.stringify(res.data));
            const clientId=res.data.clientId;
            this.toastr.success('Login Successful....!!');
            if(res.data.typeOfUser===0){
              this.router.navigate(['/superadmin']);
            }
            else if(res.data.typeOfUser==1){
              this.router.navigate(['/superadmin/project/',clientId]);
            }
            else if(res.data.typeOfUser==2){
              this.router.navigate(['/clientEmployee']);
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

changeRoute(){
 
}

changeTextToPassword(): void {
  this.showPassword = !this.showPassword;
  this.show = !this.showPassword ? 'text' : 'password';
}

}
