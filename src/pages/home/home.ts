import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { App, NavController, NavParams, ToastController } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public appCtrl: App, public navParams:NavParams, public toast:ToastController) {
    let params = new URLSearchParams(window.location.hash);
    let token = params.get('#access_token');
    let username = params.get('username');

    if (this.navParams.get('error')) {
      this.toast.create({
        message: this.navParams.get('error'),
        duration: 3000
      }).present();
    } else if (token) {
      this.navCtrl.push(SchedulePage, {token: token, username: username});
    }
  }

  login() {
    let clientId = 'X3pxPFIacVjSBAHW';
    let redirectUri = window.location.href;
    window.location.href = 'https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id='+clientId+'&response_type=token&expiration=20160&redirect_uri=' + encodeURIComponent(redirectUri);
    
  }
}
