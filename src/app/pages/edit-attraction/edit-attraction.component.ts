import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Attraction } from 'src/app/data';
import { AuthService } from 'src/app/services/auth.service';
import { SomeAttractionsService } from 'src/app/services/some-attractions.service';

@Component({
  selector: 'app-edit-attraction',
  templateUrl: './edit-attraction.component.html',
  styleUrls: ['./edit-attraction.component.scss']
})
export class EditAttractionComponent implements OnInit{
  public id!: number;
  public attraction?: Attraction;
  public reader = new FileReader();
  public attractionForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    // latitude: new FormControl('1'),
    // longitude: new FormControl('1'),
  });
  public files: File[] = [];
  public pics: any[] = [];
  public markCoords!: [number, number];
  constructor(
    private attractionsService: SomeAttractionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
  ) {

  }
  ngOnInit(): void {
    this.authService.isAuth.subscribe(res => {
      if (res == false) {
        this.router.navigate(['attractions']);
      }
    });
    this.authService.checkAuth();
    this.id = Number(this.route.snapshot.params['id']);
    this.load();
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.pics.splice(index, 1);
  }

  addFile(event: any) {
    this.files.push(event.target.files[0]);
    this.reader.readAsDataURL(event.target.files[0]);
		this.reader.onload = (_event) => {
      const index = this.pics.length;
      this.pics.push({url: this.reader.result, index: index});
		}
  }

  private blobToFile = (theBlob: Blob): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    //Cast to a File() type
    return <File>theBlob;
  }

  load() {
    this.attractionsService.getAttraction(this.id).subscribe((res: any) => {
      this.attraction = res.data;
      console.log(this.attraction);
      if (this.attraction) {
        this.attractionForm.patchValue({
          title: this.attraction?.title ?? '',
          description: this.attraction?.description ?? '',
        });
        this.markCoords = [this.attraction.latitude, this.attraction.longitude];
        // this.attraction.images.forEach(image => {
        //   this.attractionsService.getImage(image.url).subscribe(image => {
        //     this.reader.readAsDataURL(image);
        //     this.reader.onload = (_event) => {
        //       this.files.push(this.blobToFile(image));
        //       const index = this.pics.length;
        //       this.pics.push({url: this.reader.result, index: index});
        //     }

        //   })
        // });
      }
    })
  }

  edit() {
    const controls = this.attractionForm.controls;
    this.attractionsService.editAttraction(this.id, controls.title.value!, controls.description.value!, this.markCoords[0], this.markCoords[1],this.files).subscribe((res: any) => {
      console.log('editing...')
      console.log(res)
      if (res.body?.data?.id) {
        console.log('edited')
        this.messageService.add({
          severity:'success', 
          summary:'Достопримечательность изменена',
        });
        
      } else {
        this.messageService.add({
          severity:'error', 
          summary:'Что-то пошло не так',
        });
      }
    })
  }
}
