import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDWt6y4laxeTBq2RYDY6Jg4_pOkdxwsjUE",
      authDomain: "directed-sonar-241507.firebaseapp.com",
      databaseURL: "https://directed-sonar-241507.firebaseio.com",
      projectId: "directed-sonar-241507",
      storageBucket: "directed-sonar-241507.appspot.com",
      messagingSenderId: "816396321770",
      appId: "1:816396321770:web:193e84ee21b16d41"
    }, 'Petcoffee'),
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SMS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
