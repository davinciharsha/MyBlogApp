import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

constructor(private http: HttpClient) { }
loginBaseUrl = 'http://localhost:5000/api/auth/';

// tslint:disable-next-line: typedef
userLogin(userLoginModel: any){
  return this.http.post(this.loginBaseUrl + 'login', userLoginModel)
  .pipe(map((response: any) => {
      const user = response;
      if (user){
        localStorage.setItem('token', user.token);
      }
    })
  );
}

}
