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
  }

  ngOnInit(): void {
   if(this.name==='Feel, Use, Do and See survey'){
    // this.api.getFudsForQuestionGraph(this.id).subscribe({next:(res)=>{
      this.api.getAllReports().subscribe({next:(res)=>{
      // if(res.success){

        this.showQuestionGraph(res);
      // }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Employee Engagement survey'){
    this.api.getEEForQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Exit survey'){
    this.api.getExitSurveyForQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Onboarding feedback survey'){
    this.api.getOnboardingEffectivenessForQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Induction effectiveness survey'){
    this.api.getInductionSurveyQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='On-the-job training effectiveness survey'){
    this.api.getOJTSurveyQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Pulse surveys'){
    this.api.getPulseSurveyQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
   else if(this.name==='Manager Effectiveness survey'){
    this.api.getManagerEffectivenessQuestionGraph(this.id).subscribe({next:(res)=>{
      if(res.success){
        this.showQuestionGraph(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
   }
  }

  // showQuestionGraph(res: any) {
  //   const details=res.graphFuds[0];
  //   const xAxisCategories = res.data.xaxis;
  //   const options = res.data.options;
  
  //   const seriesData = options.map((option: any) => {
  //     const values = Object.values(option)[0];
  //     return {
  //       name: Object.values(option)[1],
  //       data: values
  //     };
  //   });
  
  //   this.chartOptions = {
  //     series: seriesData,
  //     chart: {
  //       type: "bar",
  //       height: 350,
  //       stacked: true,
  //       stackType: "100%"
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: true
  //       }
  //     },
  //     stroke: {
  //       width: 1,
  //       colors: ["#fff"]
  //     },
  //     xaxis: {
  //       categories: xAxisCategories
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function(val: string) {
  //           return val + "";
  //         }
  //       }
  //     },
  //     fill: {
  //       opacity: 1
  //     },
  //     legend: {
  //       position: "top",
  //       horizontalAlign: "left",
  //       offsetX: 40
  //     },
  //     colors: ['#2155a3', '#2980b9', '#069de0', '#70c4fe', '#7ec5f8'] 
  //   };
  // }
  
  showQuestionGraph(res: any) {
    // Extract stage data from the response
    const data = res.graphFuds[0];
    console.log(data)
    const stageData = data.questionGraph.find((stage: any) => stage.stage === this.stageName);
    console.log(stageData);

    if (!stageData) {
        console.error('Stage not found');
        return;
    }

    const xAxisCategories = stageData.xaxis;
    const options = stageData.options;

    const seriesData = options.map((option: any) => {
        const values = Object.values(option)[0];
        return {
            name: Object.values(option)[1],
            data: values
        };
    });

    this.chartOptions = {
        series: seriesData,
        chart: {
            type: "bar",
            height: 350,
            stacked: true,
            stackType: "100%"
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
                formatter: function (val: string) {
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
        colors: ['#2155a3', '#2980b9', '#069de0', '#70c4fe', '#7ec5f8']
    };
}

  onClose(): void {
    this.dialogRef.close();
  }

}
