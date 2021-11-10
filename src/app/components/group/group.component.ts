import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../services/group.service";
import GroupResponseModel from "../../model/group/groupResponseModel";
import Swal from 'sweetalert2'
import {ResultResponse} from "../../model/ResultResponse";

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
  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getGroupById()
  }

  async getGroupById(): Promise<void> {
    try {
      this.groupService.getGroupById(this.userId.id, this.groupId).subscribe(async (data) => {
        this.group = data as GroupResponseModel;
        this.isMember = this.group.isMember
      })

    } catch (error) {
      console.error(error);
    }
  }

  async joinOrLeaveGroup(): Promise<void> {
    if(this.isMember) {
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

      }
      catch (error) {
        console.error(error)
      }
    }
    this.isMember = !this.isMember
  }

  showError(): void {
    Swal.fire(
      "Server Error",
      "please contact admin",
      "error"
    )
  }

}
