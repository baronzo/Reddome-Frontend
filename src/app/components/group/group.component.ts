import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../services/group.service";
import GroupResponseModel from "../../model/group/groupResponseModel";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {

  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))
  public groupId: number = 1
  public group: GroupResponseModel
  public isMember: boolean = false

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getGroupById()
  }

  async getGroupById(): Promise<void> {
    try {
      this.groupService.getGroupById(this.userId.id, this.groupId).subscribe(async (data) => {
        this.group = data as GroupResponseModel;
      })

    } catch (error) {
      console.error(error);
    }
  }

  joinOrLeaveGroup(): void{
    this.isMember = !this.isMember
  }

}
