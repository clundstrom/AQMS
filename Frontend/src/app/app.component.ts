import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MapAng';

  data = '';

  constructor(private http: HttpService) {
  }

  ngOnInit() {
  }

  printData() {
    const obs = this.http.getData();
    obs.subscribe((res) => {
      if (res) {
        this.data = res as string;
        console.log(res);
      }
    });
  }
}
