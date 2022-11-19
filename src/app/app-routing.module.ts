import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NewAttractionComponent } from './pages/new-attraction/new-attraction.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'attraction', component: AttractionComponent },
  { path: 'new-attraction', component: NewAttractionComponent },
  { path: 'search', component: SearchComponent },
  { path: '**',   redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
