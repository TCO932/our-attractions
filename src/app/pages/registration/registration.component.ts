import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
  });

  constructor(
    private router: Router,
    private authServise: AuthService,
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

  register() {
    const controls = this.registrationForm.controls;
    this.authServise.register(controls.email.value!, controls.name.value!, controls.password.value!, controls.password_confirmation.value!);
  }
}
