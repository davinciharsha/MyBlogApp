import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagedList, PagedListResult } from '_Models/PagedList';
import { User } from '_Models/user';
import { AlertifyService } from '_Services/alertify.service';
import { UserService } from '_Services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[];
  pagination: PagedList;
  likesParam: string;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].PagedList;
    });
    this.likesParam = 'Likees';
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((users: PagedListResult<User[]>) => {
        this.users = users.result;
        this.pagination = users.PagedList;
      }, error => {
        this.alertify.error('Error fetching users');
      });
  }


}
