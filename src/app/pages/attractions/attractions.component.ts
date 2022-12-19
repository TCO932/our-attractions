import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Attraction, Filter, Links, Meta } from 'src/app/data';
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
  public links: Links = {};
  public meta!: Meta;
  public baseUrl: string = 'attractions';
  public url: string = this.baseUrl;

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
    this.attractionsService.getAttractions(this.url, this.sorted, +this.filter).subscribe((res: any) => {
      this.attractions = res.data;
      this.links = res.links;
      this.meta = res.meta;

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
  setUrl(page: number) {
    this.url = this.baseUrl + `?page=${page}`;
  }
  paginate(event: any) {
    this.setUrl(event.page+1);
    this.load();
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

  }
}
