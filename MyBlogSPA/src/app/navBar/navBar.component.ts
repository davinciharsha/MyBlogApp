import { Component, OnInit } from '@angular/core';
import { AuthService } from '_Services/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})

export class NavBarComponent implements OnInit {
  userLoginModel: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.userLogin();
  }

  userLogin(): void {
    console.log('user login model : ', this.userLoginModel);
    this.authService.userLogin(this.userLoginModel).subscribe(next => {
      console.log('successfully');
      // this.loggedIn();
    }, error => {
      console.log('error');
    });
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    console.log('token :', token);
    if (token){
      return !!token;
    }
  }

  logOut(): void{
    localStorage.removeItem('token');
  }
}
