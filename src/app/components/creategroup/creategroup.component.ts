import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import CreateGroupModel from 'src/app/model/group/CreateGroupRequest';
import { CreateGroupService } from 'src/app/services/creategroup.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.scss']
})
export class CreategroupComponent implements OnInit {

  public isShow: boolean = true
  public changeParentToFalse: boolean = false
  public createGroup: CreateGroupModel = new CreateGroupModel
  @Output() changeCreateGroup = new EventEmitter<boolean>()
  @Output() createGroupSuccess = new EventEmitter<boolean>()
  constructor(
    private createGroupService: CreateGroupService,
  ) { }

  ngOnInit(): void {
  }


  onChange(): void {
    this.isShow = false
    this.changeCreateGroup.emit(this.changeParentToFalse)
  }

  onFileSelected(event: Event) {
    console.log(event);
  }

  onCreateCommunity() {
    const body: CreateGroupModel = {
      name: this.createGroup.name,
      group_profile: 'https://www.pctechnologies.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg',
      group_banner: 'https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?size=626&ext=jpg',
      detail: this.createGroup.detail
    }
    console.log(body)
    try {
      this.createGroupService.createGroup(body).subscribe((data) => {
        console.log(data);
        this.isShow = false
        this.changeCreateGroup.emit(this.changeParentToFalse)
        this.createGroupSuccess.emit(true)
      })     
    } catch (error) {
      console.error(error)
    }
  }
}
