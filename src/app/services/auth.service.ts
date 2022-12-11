import { HttpClient, HttpHeaders, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(
    private http: HttpClient,
    private cookieExtractor: HttpXsrfTokenExtractor,
  ) { 
    console.log('getting token')
    // const token = sessionStorage.getItem('XSRF-TOKEN');
    // if (!token) {
    //   this.getToken();
    // }
    this.getToken();
  }

  ngOnInit(): void {
  }

  setToken(token: string) {
    sessionStorage.setItem('XSRF-TOKEN', token);
  }

  getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    headers.append('Content-Type', 'application/json');
    this.http.get(environment.api + 'sanctum/csrf-cookie', { observe: 'response', withCredentials: true, headers: headers }).subscribe(res => {
      console.log(res)
    });
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //   }),
    //   observe: "response"
    // };
    // this.http.get<any>(environment.api + 'sanctum/csrf-cookie', httpOptions).subscribe(
    //   (res) => {
    //     console.log(res)
    //   }
    // )
  }

}
