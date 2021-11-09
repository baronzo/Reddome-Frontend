import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import CreateRequestCommentModel from "../model/commentModel/CreateCommentModel";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  getCommentById(postid:number) {
    return this.http.get(`${this.api_path}/getcommentsbypost?postId=${postid}`)
  }

  createComment(body: CreateRequestCommentModel) {
    return this.http.post(`${this.api_path}/createcomment`,body)
  }

  deleteComment(id:number) {
    return this.http.delete(`${this.api_path}/deletecomment?Id=${id}`)
  }
}