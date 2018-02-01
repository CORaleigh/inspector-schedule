import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserinfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserinfoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserinfoProvider Provider');
  }

  getUserInfo(token, username) {
    return new Promise(resolve => {
      let params = new HttpParams()
        .set('f', 'json')
        .set('token', token);
      this.http.get('https://ral.maps.arcgis.com/sharing/rest/community/users/' + username, {params: params})
        .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });    
  }
}
