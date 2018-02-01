import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserinfoProvider } from '../../providers/userinfo/userinfo';
import { InspectionsProvider } from '../../providers/inspections/inspections';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  token:string;
  username:string;
  fields:Array<any>;
  user:any = {};
  assignments: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userinfo:UserinfoProvider, public inspections: InspectionsProvider) {
    this.token = navParams.get('token');
    this.username = navParams.get('username');
    
  }
  getUserInfo(token, username) {
    this.userinfo.getUserInfo(token, username).then(data => {
      this.user = data;
      this.inspections.getWorkerInfo(token, username).then(data => {
        if (data['features'].length > 0) {
          let workerid = data['features'][0]['attributes']['OBJECTID'];
          this.inspections.getInspections(token, workerid).then(data => {
            this.assignments = [];
            this.fields = data['fields'];
            data['features'].forEach(assignment => {
              this.assignments.push(assignment);
            });
          });
        }
      });
    });
  }
  reorderItems(indexes) {
    let element = this.assignments[indexes.from];
    this.assignments.splice(indexes.from, 1);
    this.assignments.splice(indexes.to, 0, element);
  }
  getCodedValue(value, field) {
    let label = '';
    this.fields.forEach(f => {
      if (f.name === field) {
        if (f.domain) {
          if (f.domain.codedValues) {
            f.domain.codedValues.forEach(cv => {
              if (cv.code === value) {
                label = cv.name;
              }
            })
          }
        }
      }
      return label;
    });
    return label;
  }

  setSchedule() {
    this.assignments.forEach((assignment, i) => {
      let date:Date = new Date();
      console.log(date)
      date.setHours(date.getHours() + i);
      console.log(date);
      assignment.attributes.dueDate = date;
    });
    this.inspections.updateInspections(this.token, this.assignments);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.getUserInfo(this.token, this.username);
  }

}
