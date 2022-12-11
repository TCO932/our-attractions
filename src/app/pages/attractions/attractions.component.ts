import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from 'src/app/data';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  public filter: Filter = {};
  public attractionName: string = '';
  public attractions: any[] = [];

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.attractions = this.searchAttraction()
  }

  goToDetails(id: string) {
    this.router.navigate([`attraction/${id}`]);
  }

  addAttraction() {
    
  }

  searchAttraction() {
    return [
      {
        id: '1',
        name: 'великая китайская стена',
        date: '12.12.2022'
      },
      {
        id: '2',
        name: 'atr2',
        date: '12.12.2022'
      },
      {
        id: '3',
        name: 'atr3',
        date: '12.12.2022'
      },
      {
        id: '4',
        name: 'atr4',
        date: '12.12.2022'
      },
      {
        id: '5',
        name: 'atr5',
        date: '12.12.2022'
      },
      {
        id: '6',
        name: 'atr6',
        date: '12.12.2022'
      },
    ]
  }

}
