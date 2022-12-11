import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'tg',
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/tg.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'vk',
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/vk.svg")
    );
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  navigate(route: string) {
    this.router.navigate([route]);
    console.log('routed!!')
  }
}
