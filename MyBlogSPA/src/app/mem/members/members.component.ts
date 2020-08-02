import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../_Services/user.service';
import { AlertifyService } from '../../../../_Services/alertify.service';
import { User } from '_Models/user';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }
}
