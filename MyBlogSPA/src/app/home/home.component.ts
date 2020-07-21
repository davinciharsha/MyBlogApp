import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hideRegisterForm = false;
  registrationStatus = false;
  @ViewChild(RegisterComponent) registerComp: RegisterComponent;
  constructor() { }

  ngOnInit(): void {
  }

  regUserStatus(regStatus): void {
    this.registrationStatus = regStatus;
    if (regStatus) {
      this.hideRegisterForm = false;
    }
  }

  registerFormToggle(): void {
    this.hideRegisterForm = !this.hideRegisterForm;
    console.log('register user method');
  }
}
