import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ur-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;

  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  login() {
    this.loginService.login(this.user)
      .subscribe(resp => {
        this.securityObject = resp;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
        () => {
          // Initialize security object to display error message
          this.securityObject = new AppUserAuth();
        });
  }
}
