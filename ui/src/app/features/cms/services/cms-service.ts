import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  private readonly http = inject(HttpClient);

  getPageBySlug(): Observable<string> {
    return this.http.get<string>(
        `http://localhost:3000/api/pages/6908871827f2de3a36eff478?depth=2&draft=false&locale=de&trash=false`,
        {withCredentials: true}
    );
  }

}

