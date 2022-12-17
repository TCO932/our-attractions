import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attraction } from 'src/app/data';
import { AuthService } from 'src/app/services/auth.service';
import { SomeAttractionsService } from 'src/app/services/some-attractions.service';
@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent implements OnInit{
  public id!: number;
  public attraction?: Attraction;
  public isLoggedIn: boolean = false;
  public pics = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
  ]
  public responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  constructor(
    private attractionsService: SomeAttractionsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    ) {

  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.authService.isAuth.subscribe(res => this.isLoggedIn = res);
    this.authService.checkAuth();
    this.load();
  }

  load() {
    this.attractionsService.getAttraction(this.id).subscribe((res: any) => {
      this.attraction = res.data
    })
  }

  sendComment(text: string) {
    this.attractionsService.addComment(this.id, 'а чо у комментов есть название 0_о', text).subscribe({
      next: res => {
        this.load();
      }
    });
  }
}
