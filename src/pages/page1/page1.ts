import { Component } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation, Geocoder, GeocoderRequest } from 'ionic-native';
import { angularReverseGeocode } from 'an'
import {Page2} from "../page2/page2";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  data: any;
  long: any;
  lat: any;

  constructor(public navCtrl: NavController,public http: Http, public alertCtrl: AlertController) {

    this.long='dsdsdsd';
    if (navigator.geolocation) {
      var options = {
         enableHighAccuracy: false
      };

      navigator.geolocation.getCurrentPosition(position=> {

        console.info('using navigator');
        this.long=position.coords.latitude;
        this.lat=position.coords.longitude;
        console.info(position.coords.latitude);
        console.info(position.coords.longitude);
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'The application cannot grab your current location. Please restart the app',
          buttons: ['OK']
        });
        alert.present();
      }, options);
    }
    this.data={

    };

    this.http = http;


  }
  submit(details){

    Geolocation.getCurrentPosition().then((resp) => {




 var link = 'http://stark-taiga-86375.herokuapp.com/api/registration';
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });


 var data = JSON.stringify({
 firstName: this.data.firstName,
 lastName:  this.data.lastName,
 email: this.data.email,
 phoneNumber: this.data.phoneNumber,
 password: this.data.password,
 address: resp.coords.longitude+','+resp.coords.latitude,
 userType: 'Basic user',
 coordinates: resp.coords.longitude+','+resp.coords.latitude
 });

 this.http.post(link, data, options)
 .subscribe(data => {
   if(data.json().responsee=='true'){
     this.navCtrl.push(Page2);
     let alert = this.alertCtrl.create({
       title: 'Success',
       subTitle: 'You can now login',
       buttons: ['OK']
     });
     alert.present();
   }
   else {
     let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'please retry',
       buttons: ['OK']
     });
     alert.present();

   }


 }, error => {
   let alert = this.alertCtrl.create({
     title: 'Error',
     subTitle: 'The application cannot grab your current location. Please restart the app',
     buttons: ['OK']
   });
   alert.present();

 });



      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'The application cannot grab your current location. Please restart the app',
        buttons: ['OK']
      });
      alert.present();
    });


  }

  goToLogin(){
    this.navCtrl.push(Page2);
  }
}
