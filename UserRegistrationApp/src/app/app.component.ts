import { Component } from '@angular/core';
import { AppUserAuth } from './login/app-user-auth';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = "User registration";
  securityObject: AppUserAuth = null;

  constructor(private securityService: LoginService) {
    this.securityObject = securityService.securityObject;
  }

 // logout(): void {
  //  this.securityService.logout();
 // }
}
