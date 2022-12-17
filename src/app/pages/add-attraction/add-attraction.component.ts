import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(
    private attractionsService: SomeAttractionsService,
    private authService: AuthService,
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
    // this.attractionsService.addAttraction(controls.title.value!, controls.description.value!, +controls.latitude.value!, +controls.longitude.value!, this.files)
    this.attractionsService.addAttraction(controls.title.value!, controls.description.value!, 1, 1, this.files).subscribe(res => {
      console.log(res)
    })
  }

}
