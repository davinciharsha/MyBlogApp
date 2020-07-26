import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../../_Services/auth.service';
import { AlertifyService } from '../../_Services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router){}
  canActivate(): boolean {
    if (this.authService.loggedIn()){
      return true;
    }else{
      this.alertify.error('Please login to access the required page');
      this.router.navigate(['/home']);
      return false;
    }
  }
}

