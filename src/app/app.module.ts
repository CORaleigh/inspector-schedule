import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InspectionsProvider } from '../providers/inspections/inspections';
import { LoginProvider } from '../providers/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { UserinfoProvider } from '../providers/userinfo/userinfo';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReassignPage } from '../pages/reassign/reassign';
import { InspectorPipe } from '../pipes/inspector/inspector';
@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    SchedulePage,
    ReassignPage, 
    InspectorPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    SchedulePage,
    ReassignPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InspectionsProvider,
    LoginProvider,
    UserinfoProvider
  ]
})
export class AppModule {}
