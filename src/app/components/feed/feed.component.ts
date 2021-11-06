import { Component, OnInit } from '@angular/core';
import ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.sesrvice'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {

  public allpost: ResponsePostByIdModel[] = []

  temp: ResponsePostByIdModel[];

  constructor(private postService: PostService) {
    
  }
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
  }

}
