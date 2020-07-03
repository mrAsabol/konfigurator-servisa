import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SelectedServices } from '../../selected-services';

@Component({
  selector: 'app-konfigurator-stepper',
  templateUrl: './konfigurator-stepper.component.html',
  styleUrls: ['./konfigurator-stepper.component.css']
})
export class KonfiguratorStepperComponent implements OnInit {
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;

  displayStepper = false;
  serviceSum: number = null;
  serviceSumDiscounted = this.serviceSum;
  serviceDiscount: number;
  isCouponValid = false;
  isCouponDisplayed = false;
  displayedSum = false;
  couponValue: any;
  couponMsg: string;
  nameValue: string;
  emailValue: string;
  phoneValue: number;
  messageValue: any = '';
  selectedModel: string;
  selectedServicesArray: any[] = [];

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
    this.formGroup3 = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      messageCtrl: ['']
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
    }else if (this.couponValue && this.couponValue !== 'Tokić123') {
      this.couponMsg = 'Kupon nije ispravan!';
    }
  }

  onDisplayStepper(){
    this.displayStepper = true;
  }

  checkCheckBoxvalue(event){
    if (event.checked){
      this.serviceSum += +event.source.value;
      this.serviceSumDiscounted = this.serviceSum;
      this.validateCoupon();
      const selectedArr = new SelectedServices();
      selectedArr.name = event.source.name;
      selectedArr.price = event.source.value;
      this.selectedServicesArray.push(selectedArr);

    } else {
      this.serviceSum -= +event.source.value;
      this.serviceSumDiscounted = this.serviceSum;
      this.validateCoupon();
      for (let i = 0; i < this.selectedServicesArray.length; i++) {
        if (this.selectedServicesArray[i].name === event.source.name) {
          this.selectedServicesArray.splice(i, 1);
        }
      }
    }
  }

  getSelectedRadio(e){
   this.selectedModel = e.value;
 }

 saveContactData(){
   this.nameValue = this.formGroup3.get('nameCtrl').value;
   this.emailValue = this.formGroup3.get('emailCtrl').value;
   this.phoneValue = this.formGroup3.get('phoneCtrl').value;
   this.messageValue = this.formGroup3.get('messageCtrl').value;
 }

 editStepOne(stepper: MatStepper){
  stepper.selectedIndex = 0;
 }

 editStepTwo(stepper: MatStepper){
  stepper.selectedIndex = 1;
 }

 editStepThree(stepper: MatStepper){
  stepper.selectedIndex = 2;
 }


}
