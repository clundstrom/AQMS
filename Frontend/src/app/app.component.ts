import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MapAng';

  dataString = '';
  jsonData = [];
  temp = [];

  constructor(private http: HttpService) {
  }

  ngOnInit() {
  }

  printTemp() {
    const obs = this.http.getData();
    obs.subscribe((res) => {
      if (res) {
        this.dataString = JSON.stringify(res);
        this.jsonData = JSON.parse(this.dataString);
        this.jsonData = this.jsonData.slice(63, 70);
        var values = [];
        

        this.jsonData.forEach((element) => values.push(element.temperature))
        this.temp = values;
      }
    });
  }
}
