import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SomeAttractionsService {

  constructor(
    private http: HttpClient,
    private authServise: AuthService,
    ) { 
    
  }

  getAttractions(url: string, sorted: number, filter: number) {
    let params = new HttpParams()
      .set('sorted', sorted)
      .set('filter', filter)
    if (filter == 1) {
      params = params.set('remember_token', this.authServise.getToken()!);
    }
    return this.http.get(environment.api + url, {params});
  }

  getAttraction(id: number) {
    return this.http.get(environment.api + `attractions/${id}`);
  }

  
  addAttraction(title: string, description: string, latitude: number, longitude: number, files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('remember_token', this.authServise.getToken()!);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('latitude', '' + latitude);
    formData.append('longitude', '' + longitude);
    for (let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[i]);
    }

    const req = new HttpRequest('POST', environment.api + `attractions`, formData, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  editAttraction(id: number | string, title: string, description: string, latitude: number, longitude: number, files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('remember_token', this.authServise.getToken()!);
    formData.append('id', String(id));
    formData.append('title', title);
    formData.append('description', description);
    formData.append('latitude', '' + latitude);
    formData.append('longitude', '' + longitude);
    for (let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[i]);
    }

    const req = new HttpRequest('POST', environment.api + `attractions/${id}`, formData, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  searchAttractions(search: string, sorted: number, filter: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      remember_token: this.authServise.getToken(),
      search: search,
      sorted: sorted,
      filter: filter,
    };
    return this.http.post(environment.api + `search`, body, { headers: headers });
  }
  
  addComment(attractionId: number, title: string, text: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      remember_token: this.authServise.getToken(),
      title: title,
      text: text,
    };
    return this.http.post(environment.api + `attractions/${attractionId}/comments`, body, { headers: headers });
  }

  delete(attractionId: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {};
    return this.http.post(environment.api + `attractions/${attractionId}/delete`, body, { headers: headers });
  }
}
