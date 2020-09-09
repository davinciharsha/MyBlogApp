import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '_Models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '_Services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '_Services/user.service';
import { AuthService } from '_Services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line: typedef
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhoto.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser(): void {
    console.log('updated details : ', this.user);
    this.userService.editUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('update successful');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  setMainPhoto(photoUrl): void {
    this.user.photoUrl = photoUrl;
    // this.authService.currentUser.photoUrl = photoUrl;
  }

}
