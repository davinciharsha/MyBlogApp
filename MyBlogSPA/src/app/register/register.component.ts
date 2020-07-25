import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '_Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserModel: any = {};
  @Output() regUserStatus: EventEmitter<any> = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(): void{
    console.log('this.registerUserModel :', this.registerUserModel);
    this.authService.userRegister(this.registerUserModel).subscribe(next => {
      this.regUserStatus.emit(true);
      console.log('reg successful');
    });
  }

  cancelClicked(): void{
    this.regUserStatus.emit(true);
  }
}
