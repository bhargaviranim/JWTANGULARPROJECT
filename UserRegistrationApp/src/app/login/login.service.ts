import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';

const API_URL = "https://localhost:44367/api/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};

@Injectable()
export class LoginService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) { }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    return this.http.post<AppUserAuth>(API_URL + "login",
      entity, httpOptions).pipe(
        tap(resp => {
          // Use object assign to update the current object
          // NOTE: Don't create a new AppUserAuth object
          //       because that destroys all references to object
          Object.assign(this.securityObject, resp);
          // Store into local storage
          localStorage.setItem("bearerToken",
            this.securityObject.bearerToken);
        }));
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    localStorage.removeItem("bearerToken");
  }





}
