import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authServise: AuthService,
    private router: Router,
  ) {

  }
  
  ngOnInit(): void {
    this.authServise.isAuth.subscribe(res => {
      if (res == true) {
        this.router.navigate(['attractions']);
      }
    });
    this.authServise.checkAuth();
  }

  logIn() {
    const controls = this.loginForm.controls;
    this.authServise.login(controls.email.value!, controls.password.value!);
  }
}