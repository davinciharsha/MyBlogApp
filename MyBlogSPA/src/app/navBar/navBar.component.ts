import { Component, OnInit } from '@angular/core';
import { AuthService } from '_Services/auth.service';
import { AlertifyService } from '_Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})

export class NavBarComponent implements OnInit {
  userLoginModel: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    // this.userLogin();
    this.authService.currentPhoto.subscribe(photoUrl => this.photoUrl = photoUrl);
  }



  userLogin(): void {
    console.log('user login model : ', this.userLoginModel);
    if (this.userLoginModel.username && this.userLoginModel.password) {
      this.authService.userLogin(this.userLoginModel).subscribe(next => {
        console.log('successfully');
        this.router.navigate(['/members']);
        this.alertify.success('Login Successful');
        // this.loggedIn();
      }, error => {
        console.log('error', error);
      });
    } else {
      this.alertify.warning('Enter valid user credentials');
    }
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.userLoginModel = {};
    this.router.navigate(['/home']);
    this.alertify.warning('Logout successful');
  }
}
