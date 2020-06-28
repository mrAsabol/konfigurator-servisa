import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-konfigurator-stepper',
  templateUrl: './konfigurator-stepper.component.html',
  styleUrls: ['./konfigurator-stepper.component.css']
})
export class KonfiguratorStepperComponent implements OnInit {
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  serviceSum: number = null;
  serviceSumDiscounted = this.serviceSum;
  serviceDiscount: number;
  isCouponValid = false;
  isCouponDisplayed = false;
  displayedSum = false;
  couponValue: any;
  couponMsg: string;

  public carArray = [
    {name: 'Peugeot'},
    {name: 'Volkswagen'},
    {name: 'Citroen'},
    {name: 'Audi'},
    {name: 'Bmw'},
    {name: 'Seat'},
    {name: 'Alfa Romeo'},
    {name: 'Kia'},
    {name: 'Hyundai'},
    {name: 'Honda'},
    {name: 'Toyota'}
  ];

  public serviceArray = [
    {name: 'Zamjena ulja i filtera', price: 500},
    {name: 'Promjena pakni', price: 450},
    {name: 'Promjena guma', price: 100},
    {name: 'Servis klima uređaja', price: 299},
    {name: 'Balansiranje guma', price: 50},
    {name: 'Zamjena ulja u kočnicama', price: 229},
  ];


  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup1 = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.formGroup2 = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public diplayCoupon() {
    this.isCouponDisplayed = true;
  }

  public validateCoupon() {
    if (this.couponValue === 'Tokić123') {
      this.isCouponValid = true;
      this.serviceDiscount = this.serviceSum * 0.30;
      this.serviceSumDiscounted = this.serviceSum * 0.70;
      this.couponMsg = 'Hvala vam, unijeli ste ispravan kod kupona';
    }else {
      this.couponMsg = 'Kupon nije ispravan!';
    }
  }

  checkCheckBoxvalue(event){
    if (event.checked){
      this.serviceSum += +event.source.value;
      this.serviceSumDiscounted = this.serviceSum;
    } else {
      this.serviceSum -= +event.source.value;
      this.serviceSumDiscounted = this.serviceSum;
    }
    console.log(this.serviceSum);
  }

}
