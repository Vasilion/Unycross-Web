import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto, UsersCodegenService } from '../api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersCodegenService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      amaNumber: [''],
    });
  }

  ngOnInit(): void {}

  signup(): void {
    if (this.form.valid) {
      this.userService
        .apiUsersSignUpPost(
          this.form.controls['username'].value,
          this.form.controls['password'].value,
          this.form.controls['email'].value,
          this.form.controls['amaNumber'].value
        )
        .subscribe((res: UserDto) => {
          console.log('signed up' + res.userName + ' check db');
        });
    }
  }

  login(): void {
    this.router.navigateByUrl('/');
  }
}
