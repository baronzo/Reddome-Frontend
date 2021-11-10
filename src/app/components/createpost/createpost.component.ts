import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import GroupResponseModel from 'src/app/model/group/groupResponseModel';
import CreatePostRequestModel from 'src/app/model/postModel/CreatePostRequestModel';
import ResponsePostByIdModel from 'src/app/model/postModel/ResponsePostById';
import { CreatePostService } from 'src/app/services/createpost.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  public isShow: boolean = true
  public changeParentToFalse: boolean = false
  public createPost: CreatePostRequestModel = new CreatePostRequestModel
  public allGroups: Array<GroupResponseModel> = new Array<GroupResponseModel>()
  @Output() changeCreatePost = new EventEmitter<boolean>()
  @Output() postSuccess = new EventEmitter()
  constructor(
    private createPostService: CreatePostService,
    private rankingService: RankingService
  ) { }

  ngOnInit(): void {
    this.getGroup()
  }

  onChange(): void {
    this.isShow = false
    this.changeCreatePost.emit(this.changeParentToFalse)
  }

  async getGroup(): Promise<void> {
    try {
        await this.rankingService.getAllGroup(1).subscribe(async data => {
        this.allGroups = data as  Array<GroupResponseModel>
        })

    } catch (error) {
      console.error(error); 
    }
  }

  submitPost(): void {
    let userId = window.localStorage.getItem('userId')
    const body: CreatePostRequestModel = {
      content: this.createPost.content,
      owner_id: JSON.parse(userId).id,
      group_id: 1
    }
    try {
      this.createPostService.createPost(body).subscribe((data) => {
        console.log(data);
        this.isShow = false
        this.postSuccess.emit(true)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
