import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'key ttn-account-v2.y3SSzk4AL71HFSGPxgnhoFPvZczPJAgsV92Xvl2EbVE'
      })
    };
    const url = 'http://localhost:4200/api/devices';

    return this.httpClient.get(url, httpOptions);
  }

}
