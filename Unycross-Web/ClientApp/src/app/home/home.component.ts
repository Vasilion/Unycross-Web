import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public blogTitle;
  public blogFeaturedImage;
  public blogMarkTest;
  constructor(private blogService: BlogService) {
    this.blogService.getAllBlogPosts().subscribe((res) => {
      console.log(res);
    });
    this.blogService.getBlogPostById(1).subscribe((res) => {
      console.log(res);
      this.blogFeaturedImage =
        environment.strapiFeaturedImageBaseUrl +
        res.data.attributes.FeaturedImage.data[0].attributes.url;
      this.blogTitle = res.data.attributes.Title;
      this.blogMarkTest = res.data.attributes.Content;
    });
  }

  onLoad(data: any) {
    console.log(data);
  }

  onError(data: any) {
    console.log(data);
  }
}
