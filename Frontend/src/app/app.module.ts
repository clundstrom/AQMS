import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import {ChartsModule} from 'ng2-charts';
import {TempChartComponent} from './components/temp-chart/temp-chart.component';
import {HttpClientModule} from '@angular/common/http';
import { HumChartComponent } from './components/hum-chart/hum-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TempChartComponent,
    HumChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
