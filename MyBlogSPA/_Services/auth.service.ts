import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  authBaseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  // tslint:disable-next-line: typedef
  userLogin(userLoginModel: any) {
    return this.http.post(this.authBaseUrl + 'login', userLoginModel)
      .pipe(map((response: any) => {
        const user = response;
        console.log('user ', user);
        if (user) {
          console.log(user.token);
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log('decoded token: ', this.decodedToken.unique_name);
        }
      })
      );
  }

  // tslint:disable-next-line: typedef
  userRegister(userRegisterModel: any) {
    return this.http.post(this.authBaseUrl + 'register', userRegisterModel)
      .pipe(map((response: any) => {
        const user = response;
        console.log('user register', user);
      })
      );
  }
  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
