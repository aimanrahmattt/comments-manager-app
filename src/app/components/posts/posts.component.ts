import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { PostResponse } from 'src/app/services/dto/response/response';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: PostResponse[] = [];

  constructor(private api: ApiService) { 
    
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.api.getAllPosts().subscribe(
      res => {
        this.posts = res;
      },
      err => {
        console.log("FAILED: Get all posts -> ", err);        
      }
    );
  }

}
