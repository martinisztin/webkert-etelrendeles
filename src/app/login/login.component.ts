import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() : void {
  }

  async login() {
    this.loading = true;

    this.authService.login(this.email.value!, this.password.value!).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/');
      this.loading = false;
    }).catch(error => {
      console.error(error);
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
  }
}
