import { Component, OnInit } from '@angular/core';
import ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.sesrvice'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {

  public allpost: ResponsePostByIdModel[] = []
  isLogin: boolean = this.getIsLogin()

  constructor(
    private cookie: CookieService,
    private router: Router,
    private postService: PostService
    ) {
    }

  temp: ResponsePostByIdModel[];
  ngOnInit(): void {
    this.getAllpost()
  }

  async getAllpost(): Promise<void> {
    // const body: ResponsePostByIdModel = {
      
    // }
    // console.log(body);
    try {
        const response = await this.postService.getAllPosts().subscribe(data => {
          this.allpost = data as ResponsePostByIdModel[]
          
        })
        
    } catch (error) {
      console.error(error); 
    }
    this.backHomeIfNoLogin()
  }

  backHomeIfNoLogin(): void {
    if(this.isLogin === false) {
      this.router.navigateByUrl('/')
    }
  }

  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

}
