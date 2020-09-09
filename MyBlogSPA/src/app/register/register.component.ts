import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '_Services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '_Models/user';
import { AlertifyService } from '_Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserModel: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  @Output() regUserStatus: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private fb: FormBuilder,
    private alertify: AlertifyService, private route: Router) { }

  ngOnInit(): void {
    this.createrRegisterForm(),
      this.bsConfig = {
        containerClass: 'theme-blue'
      };
  }

  createrRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    }, { validators: this.passwordsMatched });
  }

  passwordsMatched(g: FormGroup): any {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      this.registerUserModel = Object.assign({}, this.registerForm.value);
      this.authService.userRegister(this.registerUserModel).subscribe(() => {
        this.alertify.success('User registered successfully');
      }, error => {
        this.alertify.error('User registration faileld');
      }, () => {
        this.authService.userLogin(this.registerUserModel).subscribe(() => {
          this.route.navigate(['/members']);
        });
      });
    }
  }

  cancelClicked(): void {
    this.regUserStatus.emit(true);
  }
}
