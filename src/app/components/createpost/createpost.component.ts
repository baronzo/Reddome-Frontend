import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import GroupResponseModel from 'src/app/model/group/groupResponseModel';
import CreatePostRequestModel from 'src/app/model/postModel/CreatePostRequestModel';
import ResponsePostByIdModel from 'src/app/model/postModel/ResponsePostById';
import { CreatePostService } from 'src/app/services/createpost.service';
import { RankingService } from 'src/app/services/ranking.service';
import { SelectOptionModel } from 'src/app/model/SelectOptionModel';

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
  public option: Array<SelectOptionModel> = new Array<SelectOptionModel>()
  public groupId: number = 0
  @Output() changeCreatePost = new EventEmitter<boolean>()
  @Output() postSuccess = new EventEmitter<boolean>()
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
        let userId = window.localStorage.getItem('userId')
        await this.rankingService.getAllGroup(JSON.parse(userId).id).subscribe(data => {
        this.allGroups = data as  Array<GroupResponseModel>
        this.allGroups.map((group) => {
          if(group.isMember) {
            this.option.push({
              label: group.name,
              value: group.id
            })
          }
        })
        console.log(this.allGroups)
        })
    } catch (error) {
      console.error(error); 
    }
  }

  getGroupId($event:HTMLInputElement) {
    this.groupId = Number($event.value)
  }

  submitPost(): void {
    let userId = window.localStorage.getItem('userId')
    const body: CreatePostRequestModel = {
      content: this.createPost.content,
      owner_id: JSON.parse(userId).id,
      group_id: this.groupId
    }
    console.log(body)
    try {
      this.createPostService.createPost(body).subscribe((data) => {
        console.log(data);
        this.isShow = false
        this.changeCreatePost.emit(this.changeParentToFalse)
        this.postSuccess.emit(true)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
