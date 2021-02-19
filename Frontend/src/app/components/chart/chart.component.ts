import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  jsonData = [];

  constructor(private http: HttpService) {
  }

  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Concentration μg/m\u00B3'},
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
        this.jsonData = data.slice(63, 70);
        const values = [];

        this.jsonData.forEach((element) => values.push(element.temperature));

        this.lineChartData[0].data = values;
        this.lineChartData = [...this.lineChartData];
      }
    });
  }

}
