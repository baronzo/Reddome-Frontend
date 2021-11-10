import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import  ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.service'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.scss']
})
export class PostfeedComponent implements OnInit {

  @Input() post: ResponsePostByIdModel
  @Output() postChange = new EventEmitter<number>();

  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))

  constructor(private postService: PostService,
              private router: Router,) { }


  Deletepost() {
    this.postChange.emit(this.post.id)
  }

  ngOnInit(): void {
  }

  alertSuccess(): void {
    Swal.fire(
      'Delete Success',
      '',
      'success'
    )
  }

  likePost() {
    this.post.isLiked = true
    this.post.likeCount += 1
    console.log(this.post.isLiked);
    this.likePostApi()
    
  }

  unlikePost() {
    this.post.isLiked = false
    this.post.likeCount -= 1
    console.log(this.post.isLiked);
    this.unlikePostApi()
  }

  async likePostApi() {
    try {
      await this.postService.likePost(this.userId.id, this.post.id).subscribe(data => {})
    } catch (error) {
      console.error(error); 
    }
  }

  async unlikePostApi() {
    try {
      await this.postService.unlikePost(this.userId.id, this.post.id).subscribe(data => {})
    } catch (error) {
      console.error(error); 
    }
  }

  goToGroup(groupId:number) {
    window.localStorage.setItem('groupId', JSON.stringify(groupId))
    this.router.navigateByUrl("/group")
  }
}
