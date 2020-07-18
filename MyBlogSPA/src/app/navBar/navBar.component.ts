import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})

export class NavBarComponent implements OnInit {
  userLoginModel: any = {};
  constructor() { }

  ngOnInit(): void {
    this.userLogin();
  }

  userLogin(): void {
    console.log('user login model : ', this.userLoginModel);
  }
}
