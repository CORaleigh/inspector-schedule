import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InspectionsProvider } from '../../providers/inspections/inspections';
import { UserinfoProvider } from '../../providers/userinfo/userinfo';
import { InspectorPipe } from '../../pipes/inspector/inspector';
import * as moment from 'moment';

/**
 * Generated class for the ReassignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reassign',
  templateUrl: 'reassign.html',
})

export class ReassignPage {
  assignment:any;
  token:string;
  inspectors:Array<any> = [];
  searchtext:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public inspections:InspectionsProvider, public userinfo:UserinfoProvider) {
    this.assignment = this.navParams.get('assignment');
    this.token = this.navParams.get('token');
    this.inspections.getInspectors(this.token).then(data => {
      this.inspectors = data['features'];
      this.inspectors.forEach(inspector => {
        this.userinfo.getUserInfo(this.token, inspector.attributes.userId).then(data => {
          if (data['thumbnail']) {
            inspector.attributes.thumbnail = 'https://ral.maps.arcgis.com/sharing/rest/community/users/' + inspector.attributes.userId + '/info/' + data['thumbnail'];
          } else {
            inspector.attributes.thumbnail = 'assets/imgs/contact.png';
          }
        });
      });
    });    
  }

  reassign(inspector) {
    console.log(inspector);
    console.log(this.assignment);
    this.assignment.attributes.workerId = inspector.attributes.OBJECTID;
    this.inspections.getInspections(this.token, inspector.attributes.OBJECTID).then(data => {
      if (data['features'].length === 0) {
        this.assignment.attributes.dueDate = new Date();
      } else {
        let last = data['features'][data['features'].length - 1];
        let dueDate:Date = new Date(last.attributes.dueDate);
        
        //date.setHours(date.getHours() + i/2);
        dueDate = moment(dueDate).add(30, 'm').toDate();


        this.assignment.attributes.dueDate = dueDate;
      }

      let features = [];
      this.assignment.attributes.oids.forEach(oid => {
        features.push({attributes: {OBJECTID: oid, dueDate: this.assignment.attributes.dueDate, workerId: this.assignment.attributes.workerId}})
      });

      this.inspections.updateInspections(this.token, features).then(data => {
        this.navCtrl.pop();
      });      
    });    

  }
  searchEntered(event) {
    this.searchtext = event.target.value;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ReassignPage');

  }

}
