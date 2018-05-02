import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserinfoProvider } from '../../providers/userinfo/userinfo';
import { InspectionsProvider } from '../../providers/inspections/inspections';
import { ReassignPage } from '../reassign/reassign';
import { HomePage } from '../home/home';
import * as moment from 'moment';
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
  allAssignments: Array<any> = [];
  interval: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userinfo:UserinfoProvider, public inspections: InspectionsProvider) {
    this.token = navParams.get('token');
    this.username = navParams.get('username');
    this.user.thumbnail = 'assets/imgs/contact.png';
    
  }

  sortByDate() {
    this.assignments.sort((a:any, b:any) => {
      if (a.attributes.dueDate <  b.attributes.dueDate) {
        return -1;
      }
      if (a.attributes.dueDate >  b.attributes.dueDate) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  }

  getUserInfo(token, username) {
    this.userinfo.getUserInfo(token, username).then(data => {
      this.user = data;
      if (this.user.thumbnail) {
        this.user.thumbnail = 'https://ral.maps.arcgis.com/sharing/rest/community/users/' + username+ '/info/' + this.user.thumbnail;
      } 
      this.inspections.getWorkerInfo(token, username).then(data => {
        if (data['error']) {
          this.navCtrl.push(HomePage, {error: data['error']['message']});
        } else if (data['features'].length > 0) {
          let workerid = data['features'][0]['attributes']['OBJECTID'];
          this.inspections.getInspections(token, workerid).then(data => {
            this.assignments = [];
            this.fields = data['fields'];
            let lastLocation = null;
            data['features'].forEach(assignment => {
              this.allAssignments.push(assignment);
              assignment.attributes.oids = [];
              if (assignment.attributes.location != lastLocation) {
                assignment.attributes.ids = assignment.attributes.workOrderId;
                assignment.attributes.types = this.getCodedValue(assignment.attributes.assignmentType, 'assignmentType');
                assignment.attributes.oids.push(assignment.attributes.OBJECTID);
                this.assignments.push(assignment);
                lastLocation = assignment.attributes.location;
              } else {
                let res = this.assignments.filter( assignment => assignment.attributes.location === lastLocation);
                if (res.length > 0) {
                  res[0].attributes.ids += ", #" + assignment.attributes.workOrderId;
                  res[0].attributes.oids.push(assignment.attributes.OBJECTID);
                  if (res[0].attributes.types.indexOf(this.getCodedValue(assignment.attributes.assignmentType, 'assignmentType')) === -1) {
                    res[0].attributes.types += ", " + this.getCodedValue(assignment.attributes.assignmentType, 'assignmentType');
                  }

                }
              }
             
            });
            this.assignments.sort((a:any, b:any) => {
              if (a.attributes.dueDate <  b.attributes.dueDate) {
                return -1;
              }
              if (a.attributes.dueDate >  b.attributes.dueDate) {
                return 1;
              }
              // a must be equal to b
              return 0;
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
    this.setSchedule();
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

      let minutes = i/2 * 60;
      //date.setHours(date.getHours() + i/2);
      date = moment(date).add(minutes, 'm').toDate();
      this.allAssignments .filter(a => {return a.attributes.location === assignment.attributes.location;}).forEach(a => {
        
        a.attributes.dueDate = date;      
        console.log(a.attributes.location, a.attributes.dueDate) 
      });

    });
    
   this.inspections.updateInspections(this.token, this.allAssignments);
  }
  reassign(assignment) {
    this.navCtrl.push(ReassignPage, {assignment: assignment, token: this.token});
  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad SchedulePage');
    //this.interval = setInterval(() => this.getUserInfo(this.token, this.username), 5000);
    this.getUserInfo(this.token, this.username);
  }

  refresh() {
    this.getUserInfo(this.token, this.username);
  }

  ionViewDidLeave() {

  }


}
