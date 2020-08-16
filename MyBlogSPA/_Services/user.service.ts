import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_Models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
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
}
