import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
constructor(private router:Router) {
  
}
  onClick(){
    let url = this.router.url.replace("report", `chartReport`)
    this.router.navigate([url])
  }
}
