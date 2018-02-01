import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the InspectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InspectionsProvider {
  constructor(public http: HttpClient) {
    console.log('Hello InspectionsProvider Provider');
  }



  getWorkerInfo(token, username) {
    let url =  'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/workers_1542a408cfdd45f49da345d802197905/FeatureServer/0/query';
    return new Promise(resolve => {
      let params = new HttpParams().set('f', 'json')
        .set('token', token)
        .set('where', "userId='" + username.replace('%40', '@') + "'")
        .set('outFields', '*');
      
      this.http.get(url, {params: params})
        .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });    
  }

  getInspections(token, workerid) {
    let url =  'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/assignments_1542a408cfdd45f49da345d802197905/FeatureServer/0/query';
    return new Promise(resolve => {
      let params = new HttpParams().set('f', 'json')
        .set('token', token)
        .set('where', "workerId=" + workerid)
        .set('outFields', '*')
        .set('orderByFields', 'dueDate');

      this.http.get(url, {params: params})
        .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });    
  }
  updateInspections(token, features) {
    let url =  'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/assignments_1542a408cfdd45f49da345d802197905/FeatureServer/0/updateFeatures';
    return new Promise(resolve => {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded' );
    let params = new HttpParams()
      .set('f', 'json')
      .set('token', token)
      .set('features', JSON.stringify(features));
      
      this.http.post<any>(url, params, {headers: headers})
        .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });  
  }

}
