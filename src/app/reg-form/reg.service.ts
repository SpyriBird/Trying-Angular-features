import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface User {
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class RegService {

  constructor(private http: HttpClient) { }

  registerUser(u: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.serverUrl}/users`, u, {observe: 'response'});
  }
}
