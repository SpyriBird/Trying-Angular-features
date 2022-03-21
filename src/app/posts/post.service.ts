import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Post {
  title: string,
  body: string,
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  addPost(p: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.serverUrl}/posts`, p);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}/posts/${id}`);
  }
  
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.serverUrl}/posts`);
  }

  changePost(p: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.serverUrl}/posts/${p.id}`, {body: p.body, title: p.title})
  }
}