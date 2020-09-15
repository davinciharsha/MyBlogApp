import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_Models/user';
import { AuthService } from './auth.service';
import { PagedListResult } from '../_Models/PagedList';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  userBaseUrl = environment.apiUrl + 'users/';

  getUsers(pageNumber?, pageSize?, userParams?): Observable<PagedListResult<User[]>> {
    const pagedListResult: PagedListResult<User[]> = new PagedListResult<User[]>();

    let params = new HttpParams();
    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(this.userBaseUrl, { observe: 'response', params }).pipe(
      map(response => {
        pagedListResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          pagedListResult.PagedList = JSON.parse(response.headers.get('Pagination'));
        }
        return pagedListResult;
      })
    );
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
