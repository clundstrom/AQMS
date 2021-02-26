import {Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  tempurl: string = "?orgId=1&panelId=2";
  humurl: string = "?orgId=1&panelId=4";
  pressureurl: string = "?orgId=1&panelId=6";

  tempsrc: SafeResourceUrl;
  humsrc: SafeResourceUrl;
  pressuresrc: SafeResourceUrl;
  title = 'MapAng';

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.setDevice("http://localhost:3000/d-solo/uj2YVbsGk/vapnareg");
  }

  setDevice(device_route){
    this.tempurl=device_route+this.tempurl;
    this.tempsrc= this.sanitizer.bypassSecurityTrustResourceUrl(this.tempurl);

    this.humurl=device_route+this.humurl;
    this.humsrc= this.sanitizer.bypassSecurityTrustResourceUrl(this.humurl);

    this.pressureurl=device_route+this.pressureurl;
    this.pressuresrc= this.sanitizer.bypassSecurityTrustResourceUrl(this.pressureurl);
    

  }


}
