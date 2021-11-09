import { Component, OnInit } from '@angular/core';
import ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.sesrvice'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {

  public allpost: ResponsePostByIdModel[] = []
  isLogin: boolean = this.getIsLogin()
  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))
  isLoading: boolean = true

  constructor(
    private cookie: CookieService,
    private router: Router,
    private usersService: UsersService,
    private postService: PostService
    ) {
    }

  temp: ResponsePostByIdModel[];
  ngOnInit(): void {
    this.getAllpost()
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
    this.router.navigateByUrl('/createpost')
  }

}
