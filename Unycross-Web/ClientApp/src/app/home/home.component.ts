import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public blogMarkTest;
  constructor(private blogService: BlogService) {
    this.blogService.getAllBlogPosts().subscribe((res) => {
      console.log(res);
    });
    this.blogService.getBlogPostById(1).subscribe((res) => {
      this.blogMarkTest = res.data.attributes.Content;
    });
  }
}
