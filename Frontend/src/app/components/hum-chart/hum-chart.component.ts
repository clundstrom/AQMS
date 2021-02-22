import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-hum-chart',
  templateUrl: './hum-chart.component.html',
  styleUrls: ['./hum-chart.component.css']
})
export class HumChartComponent implements OnInit, AfterViewInit {

  jsonData = [];

  constructor(private http: HttpService) { }
  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Humidity'},

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
    this.getTemp();
  }

  ngAfterViewInit(): void {

  }

  getTemp() {
    const obs = this.http.getData();
    obs.subscribe((res) => {
      if (res) {
        const data = res as object[];
        this.jsonData = data.slice(-25, -1);
        const hum_values = [];
        const times = [];

        this.jsonData.forEach((element) => hum_values.push(element.humidity));
        this.jsonData.forEach((element) => times.push(new Date(element.time).getUTCHours()+":"+new Date(element.time).getUTCMinutes()) );

        this.lineChartData[0].data = hum_values;
        this.lineChartData = [...this.lineChartData];

        this.lineChartLabels=times;
        this.lineChartLabels=[...this.lineChartLabels]
      }
    });
  }

}
