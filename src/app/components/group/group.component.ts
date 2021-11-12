import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../services/group.service";
import GroupResponseModel from "../../model/group/groupResponseModel";
import Swal from 'sweetalert2'
import {ResultResponse} from "../../model/ResultResponse";
import ResponsePostByIdModel from "../../model/postModel/ResponsePostById";
import {PostService} from "../../services/post.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {

  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))
  public groupId: number = 1
  public group: GroupResponseModel
  public isMember: boolean
  public postList: Array<ResponsePostByIdModel>
  private sub: any;
  constructor(private groupService: GroupService,
              private postService: PostService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.getGroupIdFromPath()
    this.getGroupById()
  }

  getGroupIdFromPath() {
    this.sub = this.route.params.subscribe( params => {
      this.groupId = +params['groupId'];
    })
    console.log('groupId = ', this.groupId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkMember() {
    if(this.isMember) this.getPostByGroup()
  }

  getGroupById(): void {
    try {
      this.groupService.getGroupById(this.userId.id, this.groupId).subscribe(async (data) => {
        this.group = data as GroupResponseModel
        this.isMember = this.group.isMember
        this.checkMember()
      })

    } catch (error) {
      console.error(error);
    }
  }

  getPostByGroup(): void {

    try {
      this.postService.getPostByGroup(this.userId.id, this.groupId).subscribe(async (data) => {
        this.postList = data as Array<ResponsePostByIdModel>
        console.log(this.postList)
      })

    } catch (error) {
      console.error(error);
    }
  }

  joinOrLeaveGroup(): void {
    if(this.isMember){
      try {
        this.groupService.leaveGroup(this.userId.id, this.groupId).subscribe(async (data) => {
          let rs: ResultResponse = data as ResultResponse
          if (rs.status == 'fail') this.showError()
        })
        this.group.memberCount--
      }
      catch (error) {
        console.error(error)
      }
    }
    else {
      try {
        this.groupService.joinGroup(this.userId.id, this.groupId).subscribe(async (data) => {
          let rs: ResultResponse = data as ResultResponse
          if (rs.status == 'fail') this.showError()
        })
        this.group.memberCount++
        this.getPostByGroup()
      }
      catch (error) {
        console.error(error)
      }
    }
    this.isMember = !this.isMember
  }

  deletePost($event:number): void {
    try {
      const response = this.postService.deletePosts($event).subscribe( async data => {
        await this.getPostByGroup()
        await this.alertSuccess()
      })
    } catch (error) {
      console.error(error);
    }
  }

  showError(): void {
    Swal.fire(
      "Server Error",
      "please contact admin",
      "error"
    )
  }

  alertSuccess(): void {
    Swal.fire(
      'Delete Success',
      '',
      'success'
    )
  }

}
