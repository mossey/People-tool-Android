import { Component } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Page3} from "../page3/page3";
import {Page4} from "../page4/page4";
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {

  }
  emailChange(value){
    this.email=value;

  }
  passwordChange(value){
    this.password=value;
  }
  submit(){

    var link = 'http://localhost:8000/api/authenticate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    var data = JSON.stringify({
      email: this.email,
      password: this.password

    });

    this.http.post(link, data, options)
      .subscribe(data => {

        localStorage.setItem('id', data.json().id)

        localStorage.setItem('userID', data.json().id)
        localStorage.setItem('firstName', data.json().firstName)
        localStorage.setItem('lastName', data.json().lastName)
        localStorage.setItem('phoneNumber', data.json().phoneNumber)
        localStorage.setItem('email', data.json().email)
        localStorage.setItem('coordinates', data.json().lastname)
        localStorage.setItem('address', data.json().address)
        localStorage.setItem('userType', data.json().userType)

        if(JSON.stringify(data.json())=='false'){
          alert('wrong credentials')
        }
        if(data.json().userType=='admin'){
          this.navCtrl.push(Page3);

        }
        if(data.json().userType=='Basic user'){
          this.navCtrl.push(Page4);
        }
        if(data.json().userType=='Data clerk'){
          this.navCtrl.push(Page4);
        }

      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Login failed. Please connect to a stable network',
          buttons: ['OK']
        });
        alert.present();
        console.log("Oooops!");
      });





  }


}
