import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { SomeAttractionsService } from 'src/app/services/some-attractions.service';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.component.html',
  styleUrls: ['./add-attraction.component.scss']
})
export class AddAttractionComponent implements OnInit {
  public reader = new FileReader();
  public attractionForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    // latitude: new FormControl('1'),
    // longitude: new FormControl('1'),
  });
  public files: File[] = [];
  public pics: any[] = [];
  public markCoords?: [number, number];
  constructor(
    private attractionsService: SomeAttractionsService,
    private router: Router,
    private messageService: MessageService,
  ) {

  }
  ngOnInit(): void {
  }

  addFile(event: any) {
    this.files.push(event.target.files[0]);
    this.reader.readAsDataURL(event.target.files[0]);
		this.reader.onload = (_event) => {
      const index = this.pics.length;
      this.pics.push({url: this.reader.result, index: index});
		}
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.pics.splice(index, 1);
  }

  save() {
    const controls = this.attractionForm.controls;
    if (!this.markCoords) {
      console.log('выберите координаты')
      return;
    } else {

      this.attractionsService.addAttraction(controls.title.value!, controls.description.value!, this.markCoords[0], this.markCoords[1], this.files).subscribe((res: any) => {
        console.log(res.body)
        this.messageService.add({
          severity:'success', 
          summary:'движ',
        });
        if (res.body?.attraction_created == 'success' || res.body?.attraction_created == 'wiki_not_found') {
          this.messageService.add({
            severity:'success', 
            summary:'Достопримечательность добавлена',
          });
          this.router.navigate([`edit-attraction/${res.body.attraction.id}`]);
        } else {
          this.messageService.add({
            severity:'error', 
            summary:'Что-то пошло не так',
          });
        }
      })
    }
  }

}
