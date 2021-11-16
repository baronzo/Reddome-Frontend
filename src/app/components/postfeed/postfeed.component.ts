import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import  ResponsePostByIdModel from '../../model/postModel/ResponsePostById';
import { PostService } from '../../services/post.service'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.scss']
})
export class PostfeedComponent implements OnInit {

  @Input() post: ResponsePostByIdModel
  @Output() postChange = new EventEmitter<number>();

  public videoId: string = ""
  public tempUrl: string

  urlSafe!: SafeResourceUrl
  iframUrl: string = ""

  public userId: {id:number} = JSON.parse(window.localStorage.getItem('userId'))
  htmlMassage: string;

  constructor(private postService: PostService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.checkEmbed()
    this.htmlMassage = this.urlifyHtml(this.post.content)
  }

  urlifyHtml(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url: string) {
      return '<a href="' + url + '">' + url + '</a>';
    })
  }

  checkEmbed() {
    this.urlify(this.post.content)
    this.videoId = this.getId(this.tempUrl)
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.videoId)
  }

  urlify(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    let urlTemp = ""
    text.replace(urlRegex, function(url: string) {
      console.log("dddddd", url);
      urlTemp = url
      return url
    })
    this.tempUrl = urlTemp
    return urlTemp
  }

  getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    console.log(url);
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  Deletepost() {
    this.postChange.emit(this.post.id)
  }

  alertSuccess(): void {
    Swal.fire(
      'Delete Success',
      '',
      'success'
    )
  }

  likePost() {
    this.post.isLiked = true
    this.post.likeCount += 1
    console.log(this.post.isLiked);
    this.likePostApi()
  }

  unlikePost() {
    this.post.isLiked = false
    this.post.likeCount -= 1
    console.log(this.post.isLiked);
    this.unlikePostApi()
  }

  async likePostApi() {
    try {
      await this.postService.likePost(this.userId.id, this.post.id).subscribe(data => {
      })
    } catch (error) {
      console.error(error); 
    }
  }

  async unlikePostApi() {
    try {
      await this.postService.unlikePost(this.userId.id, this.post.id).subscribe(data => {
      })
    } catch (error) {
      console.error(error); 
    }
  }

  goToGroup(groupId:number) {
    this.router.navigate(['/group', groupId])
  }

  goToPost(postId:number) {
    this.router.navigate(['/post', postId])
  }
}
