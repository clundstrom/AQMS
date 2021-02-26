import { Injectable } from '@angular/core';
import {AppComponent} from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class ChangeChartsService {

  constructor(public app: AppComponent) { }

  changeDevice(src){
    this.app.setDevice(src);
  }
}
