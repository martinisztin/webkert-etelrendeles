import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../shared/models/user';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  })
  constructor(private location: Location, private authService: AuthService, private userService: UserService,
    private router: Router) { }
  ngOnInit(): void {    
  }

  onSubmit() {
    this.authService.signup(this.signUpForm.get('email')?.value!, this.signUpForm.get('password')?.value!).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value!,
        username: this.signUpForm.get('email')?.value?.split('@')[0]!,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value!,
          lastname: this.signUpForm.get('name.lastname')?.value!
        }
      };

      this.userService.create(user).then(_ => {
        console.log("user added successfully");
        this.router.navigateByUrl('/');
      }).catch(error => {
        console.error(error);
      });

    }).catch(error => {
      console.error(error);
    });
  }
  goBack() {
    this.location.back();
  }
}
