import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import CreateRequestCommentModel from 'src/app/model/commentModel/CreateCommentModel';
import GetResponseCommentModel from 'src/app/model/commentModel/GetCommentRespones';
import ResponsePostByIdModel from 'src/app/model/postModel/ResponsePostById';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public allComment: Array<GetResponseCommentModel> = new Array<GetResponseCommentModel>()
  public delete: any
  public post : ResponsePostByIdModel
  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))
  public comment: string = ""
  public postId: number
  public loading: boolean = false
  constructor(private commentService: CommentService,
              private postService: PostService, 
              private activeRoute: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.loading = true
    this.getPostIdFromPath()
    this.getPost(this.postId)
    this.getCommentById()
    this.createComment()
  }
  
  async getCommentById(): Promise<void> {
    try {
        this.loading = true
        await this.commentService.getCommentById(this.postId).subscribe(async data => {
        this.allComment = data as  Array<GetResponseCommentModel>
        this.loading = false
        })
    } catch (error) {
      console.error(error); 
    }
  }

  getPostIdFromPath() {
    this.activeRoute.params.subscribe( params => {
      this.postId = +params['postId'];
    })
  }

  deleteComment(id:number): void {
    try {
      this.loading = true
        this.commentService.deleteComment(id).subscribe( async data => {
        this.delete = data
        await this.getCommentById()
        this.loading = false
        })
    } catch (error) {
      console.error(error); 
    }
  }

    getPost(id:number): void {
    try {
        this.loading = true
        this.postService.getPostById(id, this.userId.id).subscribe( data => {
        this.post = data as ResponsePostByIdModel
        this.loading = false
        })
    } catch (error) {
      console.error(error); 
    }
  }

    async deletePost($event:number): Promise<void> {
      try {
        this.loading = true
        const response = await this.postService.deletePosts($event).subscribe( async data => {  
        this.router.navigateByUrl("/feed")
        this.loading = false
        })
    } catch (error) {
      console.error(error); 
    }
  }
   
  createComment() {
    if (this.comment){
        const body: CreateRequestCommentModel = {
          post_id : this.post.id,
          content : this.comment,
          owner_id : this.userId.id
        }
        try {
          this.loading = true
          const response =  this.postService.createCommnetById(body).subscribe( async data => {  
            await this.getCommentById()
            this.comment=""
            this.loading = false
          })
      } catch (error) {
        console.error(error); 
        }
      }
    }

    arrowBack() {
      this.router.navigateByUrl("/feed")
    }
}