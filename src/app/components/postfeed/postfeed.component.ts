import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import  ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.sesrvice'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.scss']
})
export class PostfeedComponent implements OnInit {

  @Input() post: ResponsePostByIdModel
  @Output() postChange = new EventEmitter<number>();

  constructor(private postService: PostService) { }


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
    
  }

  unlikePost() {
    this.post.isLiked = false
    this.post.likeCount -= 1
    console.log(this.post.isLiked);
  }

}
