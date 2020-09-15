import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../_Services/user.service';
import { AlertifyService } from '../../../../_Services/alertify.service';
import { User } from '_Models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { PagedList, PagedListResult } from '_Models/PagedList';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users: User[];
  currentUser: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  pagination: PagedList;
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].PagedList;
    });
    this.userParams.gender = this.currentUser.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'createdDate';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters(): void {
    this.userParams.gender = this.currentUser.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'createdDate';
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((users: PagedListResult<User[]>) => {
      this.users = users.result;
      this.pagination = users.PagedList;
    }, error => {
      this.alertify.error('Error fetching users');
    });
  }
}
