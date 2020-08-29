import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '_Models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  authBaseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhoto = this.photoUrl.asObservable();

  changeMemberPhoto(photo: string): void {
    this.photoUrl.next(photo);
  }

  userLogin(userLoginModel: any): any {
    return this.http.post(this.authBaseUrl + 'login', userLoginModel)
      .pipe(map((response: any) => {
        const user = response;
        console.log('user ', user);
        if (user) {
          console.log(user.token);
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
      );
  }

  userRegister(userRegisterModel: any): any {
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
