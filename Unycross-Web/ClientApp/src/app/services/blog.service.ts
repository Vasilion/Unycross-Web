import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  public getAllBlogPosts(): Observable<any> {
    let url = environment.strapiBaseUrl + '/blog-posts';
    return this.http.get(url);
  }

  public getBlogPostById(id: number): Observable<any> {
    let url = environment.strapiBaseUrl + '/blog-posts/' + id;
    return this.http.get(url);
  }
}
