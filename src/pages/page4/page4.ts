import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from 'ionic-native';
import { FormsModule } from '@angular/forms';

import { Http,  Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



/*
  Generated class for the Page4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html'
})

export class Page4 {
  posts: any;
  details:any;
  firstName: any;
  lastName:any;
  phoneNumber:any;
  email: any;
  address: any;
  coordinates: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.details={}
    this.http.get('http://127.0.0.1:8000/api/users/'+localStorage.getItem('id')).map(res => res.json()).subscribe(data => {
      console.log(JSON.stringify(data));
      this.posts = data;

      this.firstName=data[0].firstName;


      this.lastName=data[0].lastName;
      this.phoneNumber=data[0].phoneNumber;
      this.email=data[0].email;
      this.address=data[0].address;
      this.coordinates=data[0].coordinates;


    });
  }
firstNameChange(value){
    this.firstName=value;

  }
  lastNameChange(value){
    this.lastName=value;

  }
  emailChange(value){
    this.email=value;

  }
  coordinatesChange(value){
    this.coordinates=value;

  }
  phoneNumberChange(value){
    this.phoneNumber=value;

  }
  addressChange(value){
    this.address=value;
    }

  update(){



    var link = 'http://localhost:8000/api/users/update/'+localStorage.getItem('id');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var data = JSON.stringify({
      firstName: this.firstName,
      lastName:  this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,

      location: 'hapa',
      address: 'hapa hapa',
      userType: 'phoneUser',
      coordinates: 'asasas'
    });

    this.http.post(link, data, options)
      .subscribe(data => {
        alert(data);

      }, error => {
        console.log("Oooops!");
      });
  }

}
