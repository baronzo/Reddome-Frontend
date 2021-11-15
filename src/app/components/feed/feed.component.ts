import { Component, OnInit } from '@angular/core';
import ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.service'
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import Swal from 'sweetalert2';
import { RankingService } from 'src/app/services/ranking.service';
import GroupResponseModel from 'src/app/model/group/groupResponseModel';
import { GroupService } from 'src/app/services/group.service';
import { ResultResponse } from 'src/app/model/ResultResponse';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})

export class FeedComponent implements OnInit {

  public allpost: ResponsePostByIdModel[] = []
  public allGroups: Array<GroupResponseModel> = new Array<GroupResponseModel>()
  isLogin: boolean = this.getIsLogin()
  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))
  isLoading: boolean = true
  miniLoading: boolean =false
  public feedToggle: boolean = true
  public showCreatePost: boolean = false
  public showCreateGroup: boolean = false
//======================

  constructor(
    private cookie: CookieService,
    private router: Router,
    private postService: PostService,
    private rankingService: RankingService,
    private groupService: GroupService
    ) {
    }

    ngOnInit(): void {
      this.isLoading = true
      this.getAllpost()
    }

  async leaveGroup(group: GroupResponseModel): Promise<void> {
      try {
        this.miniLoading = true
        this.groupService.leaveGroup(this.userId.id, group.id).subscribe(async (data) => {
          this.allGroups[this.allGroups.findIndex((a => a.id === group.id))].isMember = false
          this.miniLoading = false
        })
      }
      catch (error) {
        console.error(error)
      }
  }

  async joinGroup(group: GroupResponseModel): Promise<void> {
    try {
      this.miniLoading = true
      this.groupService.joinGroup(this.userId.id, group.id).subscribe(async (data) => {
        this.allGroups[this.allGroups.findIndex((a => a.id === group.id))].isMember = true
        this.miniLoading = false
      })
    }
    catch (error) {
      console.error(error)
    }
}

  buttonToggle() {
    this.allpost.length
    this.getGroup()
    this.getAllpost()
    this.feedToggle = !this.feedToggle
  }

  async getGroup(): Promise<void> {
    try {
        this.miniLoading = true
        await this.rankingService.getAllGroup(this.userId.id).subscribe(async data => {
        this.allGroups = data as  Array<GroupResponseModel>
        this.miniLoading = false
        })

    } catch (error) {
      console.error(error); 
    }
  }

  async deletePost($event:number): Promise<void> {
      try {
        const response = await this.postService.deletePosts($event).subscribe( async data => {  
          await this.getAllpost()
          await this.alertSuccess()
        })
    } catch (error) {
      console.error(error); 
    }
  }

  alertSuccess(): void {
    Swal.fire(
      'Delete Success',
      '',
      'success'
    )
  }

  async getAllpost(): Promise<void> {
    try {
        const response = await this.postService.getPostsByUserId(this.userId.id).subscribe(data => {
          this.allpost = data as ResponsePostByIdModel[]
        }) 
    } catch (error) {
      console.error(error); 
    }
    this.backHomeIfNoLogin()
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }

  backHomeIfNoLogin(): void {
    if(this.isLogin === false) {
      this.router.navigateByUrl('/')
    }
  }

  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

  onCreatePost(): void {
    this.showCreatePost = !this.showCreatePost 
  }

  onCreateGroup(): void {
    this.showCreateGroup = !this.showCreateGroup 
  }

  closeModalandChangeValue($event:boolean): void {
    this.showCreatePost = $event
    this.showCreateGroup = $event
  }

  async getPostFormModal($event:boolean) {
    if($event) {
      await this.getAllpost()
    }
  }

  goToGroup(groupId:number) {
    this.router.navigate(['/group', groupId])
  }
  
}
