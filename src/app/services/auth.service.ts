import { HttpClient, HttpHeaders, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  public isAuth = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { 
  }

  checkAuth() {
    this.isAuth.next(!!localStorage.getItem('token'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(email: string, name: string, password: string, password_confirmation: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      email: email,
      name: name,
      password: password,
      password_confirmation: password_confirmation,
    }
    this.http.post(environment.api + 'register', body, { headers: headers }).subscribe((res: any) => {
      if (res.result == 'success') {
        localStorage.setItem('token', res.remember_token);
        this.isAuth.next(true);
      }
    });
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      email: email,
      password: password,
    }
    this.http.post(environment.api + 'login', body, { headers: headers }).subscribe((res: any) => {
      if (res.result == 'success') {
        localStorage.setItem('token', res.remember_token);
        this.isAuth.next(true);
      }
    });
  }

  logout() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      remember_token: this.getToken(),
    }
    this.http.post(environment.api + 'logout', body, { headers: headers }).subscribe((res: any) => {
      if (res.result == 'success') {
        localStorage.removeItem('token');
        this.isAuth.next(false);
      }
    });
  }

}
