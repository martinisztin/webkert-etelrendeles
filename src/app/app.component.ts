import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Etelrendeles';

  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe(user => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      }, error => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
      })
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_? : boolean) {
    this.authService.logout().then(() => {
      console.log("Logged out successfully");
    }).catch(error => {
      console.error(error);
    });
  }

}
