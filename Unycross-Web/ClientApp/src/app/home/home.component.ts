import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public allBlogPosts;
  public imageBaseUrl;
  constructor(private blogService: BlogService) {
    this.blogService.getAllBlogPosts().subscribe((res) => {
      this.allBlogPosts = res;
      this.imageBaseUrl = environment.strapiFeaturedImageBaseUrl;
    });
  }
}
