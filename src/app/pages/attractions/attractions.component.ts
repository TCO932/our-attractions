import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Attraction, Filter } from 'src/app/data';
import { AuthService } from 'src/app/services/auth.service';
import { SomeAttractionsService } from 'src/app/services/some-attractions.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public sorted : number = 0;
  public filter: boolean = false;
  public attractionName: string = '';
  public attractions: Attraction[] = [];

  constructor(
    private router: Router,
    private attractionsService: SomeAttractionsService,
    private authService: AuthService,
    ) {

  }

  ngOnInit(): void {
    this.authService.isAuth.subscribe(res => this.isLoggedIn = res);
    this.authService.checkAuth();
    this.load();
  }

  load() {
    this.attractionsService.getAttractions(this.sorted, +this.filter).subscribe((res: any) => {
      this.attractions = res.data
      console.log(this.attractions);
    })
  }

  goToDetails(id: number) {
    this.router.navigate([`attraction/${id}`]);
  }

  addAttraction() {
    this.router.navigate([`add-attraction`]);
  }

  searchAttraction(name: string) {
    if (name.trim().length == 0) {
      this.load();
    } else {
      this.attractionsService.searchAttractions(name, this.sorted, +this.filter).subscribe((res: any) => {
        this.attractions = res.data
        console.log(this.attractions);
      })
    }
  }

}
