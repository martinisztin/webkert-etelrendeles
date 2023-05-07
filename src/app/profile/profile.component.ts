import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user? : User;
  username? : string;
  
  changeForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.update({
      id: user.uid,
      email: this.changeForm.get('email')?.value!,
      name: {
        firstname: this.changeForm.get('name.firstname')?.value!,
        lastname: this.changeForm.get('name.lastname')?.value!
      },
      username: this.changeForm.get('email')?.value?.split('@')[0]!
    }).then(() => {
      location.reload();
    });
  }

  onDelete() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.delete(user.uid).then(() => {
      localStorage.clear();
      //location.reload();
    }).catch(error => {
      console.error(error);
    });
  }

  constructor(private fb: FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      console.log(this.user);

      this.changeForm.get('email')?.setValue(this.user?.email!);
      this.changeForm.get('name.firstname')?.setValue(this.user?.name.firstname!);
      this.changeForm.get('name.lastname')?.setValue(this.user?.name.lastname!);
      this.username = this.user?.username;
  
      // Move code that needs to use this.user inside the subscribe method
      // For example:
      // this.displayName = this.user.displayName;
      // this.photoUrl = this.user.photoUrl;
    });
  }
}
