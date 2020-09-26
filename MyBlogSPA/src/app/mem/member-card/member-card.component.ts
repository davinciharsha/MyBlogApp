import { Component, OnInit, Input } from '@angular/core';
import { timestamp } from 'rxjs/operators';
import { User } from '_Models/user';
import { AlertifyService } from '_Services/alertify.service';
import { AuthService } from '_Services/auth.service';
import { UserService } from '_Services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  sendLike(id: number): void {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertifyService.success('You liked ' + this.user.knownAs);
    }, error => {
      this.alertifyService.error(error);
    });

  }

}
