import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import GetResponseCommentModel from 'src/app/model/commentModel/GetCommentRespones';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public allComment: Array<GetResponseCommentModel> = new Array<GetResponseCommentModel>()
  public delete: any
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.getGroup()
  }
  
  async getGroup(): Promise<void> {
    try {
        await this.commentService.getCommentById(1).subscribe(async data => {
        this.allComment = data as  Array<GetResponseCommentModel>
        console.log(this.allComment)
        })

    } catch (error) {
      console.error(error); 
    }
  }

   deleteComment(id:number): void {
    try {
        this.commentService.deleteComment(id).subscribe( data => {
        this.delete = data
        console.log(id)
        })

    } catch (error) {
      console.error(error); 
    }
  }
}