import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PostService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get(`${this.api_path}/getallpost`)
  }

  getPostsByUserId(userId:number) {
    return this.http.get(`${this.api_path}/getpostbyuserid?userId=${userId}`)
  }

  deletePosts(id:number) {
    return this.http.post(`${this.api_path}/deletepostbyid?id=${id}`, null)
  }

  likePost(userId:number, postId:number) {
    const body = {
      "postId": postId,
      "userId": userId
    }
    return this.http.post(`${this.api_path}/like`, body)
  }

  unlikePost(userId:number, postId:number) {
    const body = {
      "postId": postId,
      "userId": userId
    }
    return this.http.post(`${this.api_path}/unlike`, body)
  }

  getPostByGroup(userId: number, groupId: number)  {
    return this.http.get(`${this.api_path}/getpostbygroup?userId=${userId}&groupId=${groupId}`)
  }
}
