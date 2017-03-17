import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { FormsModule } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import { Http,  Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


import { NavController, NavParams } from 'ionic-angular';
import {Page4} from "../page4/page4";



@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  posts: any;
  data: any;
  noma: string;
  post: any;
  admin: any;
  usertype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.usertype=localStorage.getItem('userType');
    if(this.usertype=='Basic user'||this.usertype=='Data clerk'){
      this.admin='true';
    }
    alert(this.usertype)
    this.post={}

    this.data = {};
    this.data.name = '';
    this.data.response = '';

    this.http = http;


    this.posts = null;

    this.http.get('http://127.0.0.1:8000/read').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(JSON.stringify(data));
    });




    console.log(this.posts);
  }


  valueChange(value){
    this.post.id=value;
    alert(JSON.stringify(value));
  }

  update(value){
   localStorage.setItem('id',value);
   alert(localStorage.getItem('id'));
   this.navCtrl.push(Page4);
  }
  delete(value){
    this.post.id=value;


    var link = 'http://localhost:8000/delete/'+this.post.id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var data = JSON.stringify({
      firstName: this.data.firstName,
      lastName:  this.data.lastName,
      email: this.data.email,
      phoneNumber: this.data.phoneNumber,
      password: this.data.password,
      location: 'hapa',
      address: 'hapa hapa',
      userType: 'phoneUser',
      coordinates: 'asasas'
    });

    this.http.post(link, data, options)
      .subscribe(data => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'The record had been deleted',
          buttons: ['OK']
        });
        alert.present();


      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: 'Please try again',
          buttons: ['OK']
        });
      });
  }

  makeAdmin(value){
    this.post.id=value;


    var link = 'http://localhost:8000/api/users/update/administrator/'+this.post.id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var data = JSON.stringify({});

    this.http.post(link, data, options)
      .subscribe(data => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'The person is now an administrator',
          buttons: ['OK']
        });
        alert.present();

      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: 'Please try again',
          buttons: ['OK']
        });

      });
  }
  makeBasicUser(value){

    this.post.id=value;


    var link = 'http://localhost:8000/api/users/update/basicUser/'+this.post.id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var data = JSON.stringify({});

    this.http.post(link, data, options)
      .subscribe(data => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'The person is now a basic user',
          buttons: ['OK']
        });
        alert.present();

      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: 'Please try again',
          buttons: ['OK']
        });
      });
  }
  makeDataClerk(value){
    this.post.id=value;


    var link = 'http://localhost:8000/api/users/update/dataClerk/'+this.post.id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var data = JSON.stringify({});

    this.http.post(link, data, options)
      .subscribe(data => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'The person is now a data clerk',
          buttons: ['OK']
        });
        alert.present();

      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: 'Please try again',
          buttons: ['OK']
        });
        alert.present();
      });
  }

}
