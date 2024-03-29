import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostResponse, CommentsResponse } from '../dto/response/response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // readonly baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<PostResponse[]>('/api/posts');
  }

  getSinglePost(postId: string) {
    return this.http.get<PostResponse>(`/api/posts/${postId}`);
  }

  getComments(postId: string) {
    return this.http.get<CommentsResponse[]>(`/api/comments?postId=${postId}`);
  }
}
