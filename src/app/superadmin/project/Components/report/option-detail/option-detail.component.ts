import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GraphService } from '../../../services/graph.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};


@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrl: './option-detail.component.css'
})
export class OptionDetailComponent implements OnInit {
  chartOptions: any;
  name: any;
  id: any;
  stageName:any;

  constructor(private dialogRef: MatDialogRef<OptionDetailComponent>,private api:GraphService,@Inject(MAT_DIALOG_DATA) public data: any){
    this.name = data.name;
    this.id = data.id;
    this.stageName = data.stageName;
    console.log(data)
  }

  ngOnInit(): void {
    const clientId = parseInt(sessionStorage.getItem('ClientId')!,10);
   if(this.name==='Feel, Use, Do and See survey '){
    this.api.getFudsForQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      // this.api.getGaph3().subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Feel, Use, Do and See survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Employee Engagement survey'){
    this.api.getEEForQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Employee Engagement survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Exit survey'){
    this.api.getExitSurveyForQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Exit survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Onboarding feedback survey'){
    this.api.getOnboardingEffectivenessForQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Onboarding feedback survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Induction effectiveness survey'){
    this.api.getInductionSurveyQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Induction effectiveness survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='On-the-job training effectiveness survey'){
    this.api.getOJTSurveyQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'On-the-job training effectiveness survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Pulse surveys'){
    this.api.getPulseSurveyQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Pulse surveys');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Manager Effectiveness survey'){
    this.api.getManagerEffectivenessQuestionGraph(clientId,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,'Manager Effectiveness survey');
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else{
    this.api.getOtherSurveyQuestionGraphForDynamicSurvey(clientId,false,this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res,this.name);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
  }

  showQuestionGraph(res: any,chartTitle:string) {
    let xAxisCategories = [];
    let options = [];
    if (this.stageName) {
      const stageData = res?.data?.stages.find((stage: any) => stage?.stage === this.stageName);
      console.log(stageData);
      
      if (stageData) {
        xAxisCategories = stageData?.xaxis;
        options = stageData?.options;
      }
    } else {
      xAxisCategories = res?.data?.xaxis;
      options = res?.data?.options;
    }
  
    const seriesData = options?.map((option: any) => {
      const values = Object.values(option)[0];
      const name = Object.values(option)[1];
      return {
        name: name,
        data: values
      };
    });
  
    this.chartOptions = {
      series: seriesData,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: xAxisCategories
      },
      tooltip: {
        y: {
          formatter: function(val: string) {
            return val + "";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      },
      colors: ['#70c4fe', '#2980b9', '#747687', '#2155a3', '#2b3a67'],
      title: {
        text: chartTitle,
        align: 'center',
        style: {
            fontSize: '15px',
            fontWeight: 'bold'
        }
    }
    };
  }
  
  onClose(): void {
    this.dialogRef.close();
  }

}
