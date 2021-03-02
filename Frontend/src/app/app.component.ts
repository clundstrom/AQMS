import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  tempUrl = '?orgId=1&panelId=2';
  humUrl = '?orgId=1&panelId=4';
  pressureUrl = '?orgId=1&panelId=6';
  densityUrl = '?orgId=1&panelId=8';

  tempSrc: SafeResourceUrl;
  humSrc: SafeResourceUrl;
  pressureSrc: SafeResourceUrl;
  densitySrc: SafeResourceUrl;
  title = 'Air Quality';

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.setDevice('http://85.228.187.157:3000/d-solo/4Yn8LwyMz/sjobrings');
  }

  setDevice(deviceRoute) {
    let url = deviceRoute + this.tempUrl;
    this.tempSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    url = deviceRoute + this.humUrl;
    this.humSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    url = deviceRoute + this.pressureUrl;
    this.pressureSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    url = deviceRoute + this.densityUrl;
    this.densitySrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}
