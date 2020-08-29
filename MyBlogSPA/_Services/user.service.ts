import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_Models/user';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  userBaseUrl = environment.apiUrl + 'users/';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userBaseUrl);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.userBaseUrl + id);
  }

  // tslint:disable-next-line: typedef
  editUser(id: number, user: User) {
    return this.http.put(this.userBaseUrl + id, user);
  }

  // tslint:disable-next-line: typedef
  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.userBaseUrl + this.authService.decodedToken.nameid + '/photos/' + id + '/setMain', {});
  }
  deletePhoto(userId: number, id: number): any {
    return this.http.delete(this.userBaseUrl + this.authService.decodedToken.nameid + '/photos/' + id);
  }
}
