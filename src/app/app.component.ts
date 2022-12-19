import { Component, ComponentRef, EmbeddedViewRef, OnInit, Type, ViewContainerRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit{
  title = 'our-attractions';
  isLoggedIn: boolean = false;
  private messageComponent!: ComponentRef<Toast>;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private messageService: MessageService,
    private readonly viewContainerRef: ViewContainerRef,
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
    this.messageComponent = this.appendComponent(Toast);
    this.authService.isAuth.subscribe(res => this.isLoggedIn = res);
    this.authService.checkAuth();
  }

  appendComponent<C>(component: Type<C>): ComponentRef<C> {
    const componentRef = this.viewContainerRef.createComponent(component);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return componentRef;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
