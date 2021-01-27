import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
