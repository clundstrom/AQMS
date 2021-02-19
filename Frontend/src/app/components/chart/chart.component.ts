import {Component, OnInit} from '@angular/core';
import { getTemplateContent } from '@angular/core/src/sanitization/html_sanitizer';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  dataString = '';
  jsonData = [];
  temp = [1,2,3,4,5,6,7];

  constructor(private http: HttpService) {
    
  }

  public lineChartData: ChartDataSets[] = [
    { data: this.temp, label: 'Concentration μg/m\u00B3' },
  ];
  public lineChartLabels: Label[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];



  ngOnInit() {
    this.lineChartData[0].data = this.getTemp();
  }

  getTemp() {
    const obs = this.http.getData();
    obs.subscribe((res) => {
      if (res) {
        this.dataString = JSON.stringify(res);
        this.jsonData = JSON.parse(this.dataString);
        this.jsonData = this.jsonData.slice(63, 70);
        var values = [];
        

        this.jsonData.forEach((element) => values.push(element.temperature))
        this.temp = values;
        console.log(this.temp);
        this.lineChartData[0].data = this.temp;
      }
    });

    
    return this.temp;
  }

}
