import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import CreateGroupModel from 'src/app/model/group/CreateGroupRequest';
import { CreateGroupService } from 'src/app/services/creategroup.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.scss']
})
export class CreategroupComponent implements OnInit {

  public isShow: boolean = true
  public changeParentToFalse: boolean = false
  public createGroup: CreateGroupModel = new CreateGroupModel
  public groupProfile: string = ''
  public groupBanner: string = ''
  @Output() changeCreateGroup = new EventEmitter<boolean>()
  @Output() createGroupSuccess = new EventEmitter<boolean>()
  constructor(
    private createGroupService: CreateGroupService,
    private store: StoreService
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
      group_profile: this.createGroup.group_profile || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.DDaN62F83emhIm7yqA3uQAHaFj%26pid%3DApi&f=1',
      group_banner: this.createGroup.group_banner || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.50XnwGKt-l0NnATeTv9ddwHaCx%26pid%3DApi&f=1',
      detail: this.createGroup.detail
    }
    try {
      this.createGroupService.createGroup(body).subscribe( async (data) => {
        this.isShow = false
        this.changeCreateGroup.emit(this.changeParentToFalse)
        this.createGroupSuccess.emit(true)
        await this.store.alertSuccess('create community success')
        window.location.href = '/feed'
      })
    } catch (error) {
      console.error(error)
    }
  }

  async uploadGroupProfile(imageInput: Event) {
    const target = imageInput.target as HTMLInputElement
    const image: File = target.files[0] as File
    let reader: FileReader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = ev => {
      this.createGroupService.uploadImage(ev.target?.result.toString().split(',')[1]).subscribe((data: any) => {
        this.groupProfile = data.data.image.filename
        this.createGroup.group_profile = data.data.display_url
      })
    }
  }

  async uploadGroupBanner(imageInput: Event) {
    const target = imageInput.target as HTMLInputElement
    const image: File = target.files[0] as File
    let reader: FileReader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = ev => {
      this.createGroupService.uploadImage(ev.target?.result.toString().split(',')[1]).subscribe((data: any) => {
        this.groupBanner = data.data.image.filename
        this.createGroup.group_banner = data.data.display_url
      })
    }
  }
}
