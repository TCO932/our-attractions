import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'our-attractions';
  isLogedIn = false;

  constructor(
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  navigate(route: string) {
    this.router.navigate([route]);
    console.log('routed!!')
  }
}
