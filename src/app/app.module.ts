import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MainComponent } from './pages/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { NewAttractionComponent } from './pages/new-attraction/new-attraction.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { AboutComponent } from './about/about.component';
import { AddAttractionComponent } from './add-attraction/add-attraction.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent,
    AttractionComponent,
    NewAttractionComponent,
    RegistrationComponent,
    LoginComponent,
    AttractionsComponent,
    AboutComponent,
    AddAttractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
