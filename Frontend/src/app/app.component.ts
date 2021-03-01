import { Component, OnInit } from '@angular/core';
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
  title = 'Air Quality';

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.setDevice("http://85.228.187.157:3000/d-solo/4Yn8LwyMz/sjobrings");
  }

  setDevice(device_route) {
    console.log(device_route);
    let url = device_route + this.tempurl;
    this.tempsrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    url = device_route + this.humurl;
    this.humsrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    url = device_route + this.pressureurl;
    this.pressuresrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}
