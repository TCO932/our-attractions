import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
