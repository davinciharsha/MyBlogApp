import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../../_Models/user';
import { UserService } from '../../_Services/user.service';
import { AlertifyService } from '../../_Services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class ListResolver implements Resolve<User[]>{
    pageSize = 5;
    pageNumber = 1;
    likesParam = 'Likees';
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alertify.error('error while fetching users using resolve');
                this.router.navigate([`/home`]);
                return of(null);
            })
        );
    }
}
