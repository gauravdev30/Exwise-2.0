import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphService } from '../../services/graph.service';
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
import { Location } from '@angular/common';

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
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrl: './demographic.component.css'
})
export class DemographicComponent implements OnInit{
  surveyId:any;
  isStaticSurvey:boolean=false;
  chartOptionsage: any;
  chartOptionsTenure:any;
  chartOptionsGender: any;
  chartOptionsWorkFlexibility: any;
  chartOptionsContractType: any;

  constructor(private route: ActivatedRoute, private api:GraphService,private location:Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.surveyId = params['surveyId'];
      this.isStaticSurvey = params['isStaticSurvey'];

      this.getDemoGraphicDetailsBySurvey();
    });
  }

  getDemoGraphicDetailsBySurvey(){
    const clientId = parseInt(sessionStorage.getItem('ClientId')!,10);
    this.api.getDemographicReportBySUrvey(clientId,this.isStaticSurvey,this.surveyId).subscribe({next:(res)=>{
      if(res.success){
        this.showDemographicAgeChart(res);
        this.showDemographicTenureChart(res);
        this.showDemographicGenderChart(res);
        this.showDemographicWorkFlexibilityChart(res);
        this.showDemographicContractTypeChart(res);
      }
    },error:(err)=>{console.log(err)},complete:()=>{}});
  }

  

  showDemographicAgeChart(res: any) {
    const demographicAgeResponse = res.data.demographicAgeResponse;
    if (!demographicAgeResponse) {
      return;
    }
    const ageCategories = [
      "<25",
      "26-30",
      "31-40",
      "41-50",
      "51-60",
      ">60"
    ];

    const ageData = [
      demographicAgeResponse.lessThan25Years,
      demographicAgeResponse.twentySixTo30Year,
      demographicAgeResponse.thirtyOneTo40Years,
      demographicAgeResponse.fourtyOneTo50Years,
      demographicAgeResponse.fiftyOneTo60Years,
      demographicAgeResponse.aboveSixtyYears
    ];

    const highestValue = Math.max(...ageData);


    let yAxisMax;
    let tickAmount;
    if (highestValue <= 10) {
      yAxisMax = 10;
      tickAmount = 4;
    } else if (highestValue <= 20) {
      yAxisMax = 20;
      tickAmount = 4;
    }else if (highestValue <= 30) {
      yAxisMax = 30;
      tickAmount = 4;
    }  else if (highestValue <= 40) {
      yAxisMax = 40;
      tickAmount = 6;
    } else if (highestValue <= 50) {
      yAxisMax = 50;
      tickAmount = 6;
    } else if (highestValue <= 60) {
      yAxisMax = 60;
      tickAmount = 8;
    }  else if (highestValue <= 70) {
      yAxisMax = 70;
      tickAmount = 8;
    }else if (highestValue <= 80) {
      yAxisMax = 80;
      tickAmount = 10;
    } else if (highestValue <= 90) {
      yAxisMax = 90;
      tickAmount = 10;
    }else if (highestValue <= 100) {
      yAxisMax = 100;
      tickAmount = 10;
    } else {
      yAxisMax = highestValue;
      tickAmount = 10;
    }

    this.chartOptionsage = {
      series: [{
        name: "Number of Users",
        data: ageData
      }],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      colors: ['#70c4fe'],
      xaxis: {
        categories: ageCategories
      },
      yaxis: {
        title: {
          text: "Number of Users"
        },
        min: 0,
        max: yAxisMax,
        tickAmount: tickAmount
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " users";
          }
        }
      },
      title: {
        text: 'Demographic Age Distribution',
        align: 'center',
        style: {
          fontSize: '15px',
          fontWeight: 'bold'
        }
      }
    };
  }





  showDemographicTenureChart(res: any) {
    const demographicTenureResponse = res.data.demographicTenureResponse;
    if (!demographicTenureResponse) {
      return;
    }
    const tenureCategories = [
      "<3 months",
      "3-11 months",
      "1-2 years",
      "3-5 years",
      "5-10 years",
      ">10 years"
    ];

    const tenureData = [
      demographicTenureResponse.lessThreeMonthTenure,
      demographicTenureResponse.threeto11MonthTenure,
      demographicTenureResponse.oneTo2YearTenure,
      demographicTenureResponse.threeTo5YearTenure,
      demographicTenureResponse.fiveTo10YearTenure,
      demographicTenureResponse.greater10Tenure
    ];

    const highestValue = Math.max(...tenureData);


    let yAxisMax;
    let tickAmount;
    if (highestValue <= 10) {
      yAxisMax = 10;
      tickAmount = 4;
    } else if (highestValue <= 20) {
      yAxisMax = 20;
      tickAmount = 4;
    }else if (highestValue <= 30) {
      yAxisMax = 30;
      tickAmount = 4;
    }  else if (highestValue <= 40) {
      yAxisMax = 40;
      tickAmount = 6;
    } else if (highestValue <= 50) {
      yAxisMax = 50;
      tickAmount = 6;
    } else if (highestValue <= 60) {
      yAxisMax = 60;
      tickAmount = 8;
    }  else if (highestValue <= 70) {
      yAxisMax = 70;
      tickAmount = 8;
    }else if (highestValue <= 80) {
      yAxisMax = 80;
      tickAmount = 10;
    } else if (highestValue <= 90) {
      yAxisMax = 90;
      tickAmount = 10;
    }else if (highestValue <= 100) {
      yAxisMax = 100;
      tickAmount = 10;
    } else {
      yAxisMax = highestValue;
      tickAmount = 10;
    }


    this.chartOptionsTenure = {
      series: [{
        name: "Number of Users",
        data: tenureData
      }],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        categories: tenureCategories
      },
      yaxis: {
        title: {
          text: "Number of Users"
        },
        min: 0,
        max: yAxisMax,
        tickAmount: tickAmount
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " users";
          }
        }
      },
      title: {
        text: 'Demographic Tenure Distribution',
        align: 'center',
        style: {
          fontSize: '15px',
          fontWeight: 'bold'
        }
      }
    };
  }


  showDemographicGenderChart(res: any) {
    const demographicGenderResponse = res.data.demographicGenderResponse;
    if (!demographicGenderResponse) {
      return;
    }
    const genderLabels = ["Male", "Female", "Other", "Not Answered"];
    const genderData = [
      demographicGenderResponse.maleUser,
      demographicGenderResponse.femaleUser,
      demographicGenderResponse.otherUser,
      demographicGenderResponse.notAnwseredUser
    ];

    this.chartOptionsGender = {
      series: genderData,
      chart: {
        type: "donut",
        height: 350
      },
      labels: genderLabels,
      title: {
        text: 'Demographic Gender Distribution',
        align: 'center',
        style: {
          fontSize: '15px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " users";
          }
        }
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  showDemographicWorkFlexibilityChart(res: any) {
    const demographicWorkFlexibilityResponse = res.data.demographicWorkFlexibilityResponse;
    if (!demographicWorkFlexibilityResponse) {
      return;
    }
    const flexibilityLabels = ["Work From Office", "Work From Home", "Hybrid"];
    const flexibilityData = [
      demographicWorkFlexibilityResponse.workFromOffice,
      demographicWorkFlexibilityResponse.workFromHome,
      demographicWorkFlexibilityResponse.hybrid
    ];

    this.chartOptionsWorkFlexibility = {
      series: flexibilityData,
      chart: {
        type: "donut",
        height: 350
      },
      labels: flexibilityLabels,
      title: {
        text: 'Demographic Work Flexibility Distribution',
        align: 'center',
        style: {
          fontSize: '15px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " users";
          }
        }
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  showDemographicContractTypeChart(res: any) {
    const demographicContractTypeResponse = res.data.demographicContractTypeResponse;
    if (!demographicContractTypeResponse) {
      return;
    }
    const contractTypeLabels = ["Full-time", "Part-time", "Fixed Contract", "Casual"];
    const contractTypeData = [
      demographicContractTypeResponse.fulltime,
      demographicContractTypeResponse.parttime,
      demographicContractTypeResponse.fixedContract,
      demographicContractTypeResponse.casual
    ];

    this.chartOptionsContractType = {
      series: contractTypeData,
      chart: {
        type: "donut",
        height: 350
      },
      labels: contractTypeLabels,
      title: {
        text: 'Demographic Contract Type Distribution',
        align: 'center',
        style: {
          fontSize: '15px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " users";
          }
        }
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  goBack(){
    this.location.back();
  }

}
