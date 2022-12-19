import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AddAttractionComponent } from './pages/add-attraction/add-attraction.component';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { EditAttractionComponent } from './pages/edit-attraction/edit-attraction.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NewAttractionComponent } from './pages/new-attraction/new-attraction.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'add-attraction', component: AddAttractionComponent },
  { path: 'attraction/:id', component: AttractionComponent },
  { path: 'edit-attraction/:id', component: EditAttractionComponent },
  { path: 'new-attraction', component: NewAttractionComponent },
  { path: '**',   redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
