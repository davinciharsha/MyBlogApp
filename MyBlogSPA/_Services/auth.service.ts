import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

constructor(private http: HttpClient) { }
authBaseUrl = 'http://localhost:5000/api/auth/';

// tslint:disable-next-line: typedef
userLogin(userLoginModel: any){
  return this.http.post(this.authBaseUrl + 'login', userLoginModel)
  .pipe(map((response: any) => {
      const user = response;
      console.log('user ', user);
      if (user){
        console.log(user.token);
        localStorage.setItem('token', user.token);
      }
    })
  );
}

// tslint:disable-next-line: typedef
userRegister(userRegisterModel: any){
  return this.http.post(this.authBaseUrl + 'register', userRegisterModel)
  .pipe(map((response: any) => {
      const user = response;
      console.log('user register', user);
    })
  );
}

}
