import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { PostResponse, CommentsResponse } from 'src/app/services/dto/response/response';
import { FormGroup, FormBuilder } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  postId: string;
  postDetails: PostResponse = {
    id: null,
    userId: null,
    title: "",
    body: ""
  };
  comments: CommentsResponse[];
  filterForm: FormGroup;
  unsubscribe$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.formInit();
    this.getPostDetails();
    this.getComments();
    this.filterComments();
  }

  formInit() {
    this.filterForm = this.fb.group({
      filterType: [''],
      filterValue: ['']
    });
  }

  getPostDetails() {
    this.api.getSinglePost(this.postId).subscribe(
      res => {
        this.postDetails = res;
      },
      err => {
        console.log("FAILED: Get post details -> ", err);
      }
    );
  }

  getComments() {
    this.api.getComments(this.postId).subscribe(
      res => {
        this.comments = res;
      },
      err => {
        console.log("FAILED: Get comments -> ", err);
      }
    );
  }

  filterComments() {   

    merge(
      this.filterForm.get('filterValue').valueChanges
    ).pipe(
      debounceTime(250),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      const type = this.filterForm.value.filterType;

      if (value) {        
        switch (type) {
          case "name":
            this.comments = this.comments.filter(comment => {
              return comment.name.trim().toLowerCase().includes(value.trim().toLowerCase());
            });
            break;
          case "email":
            this.comments = this.comments.filter(comment => {
              return comment.email.trim().toLowerCase().includes(value.trim().toLowerCase());
            });
            break;
          case "body":
            this.comments = this.comments.filter(comment => {
              return comment.body.trim().toLowerCase().includes(value.trim().toLowerCase());
            });
            break;

          default:
            this.getComments();
            break;
        }
        
      } else {
        this.getComments();
      }
    })
  }

}
