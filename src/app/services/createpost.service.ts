import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import CreatePostRequestModel from "../model/postModel/CreatePostRequestModel";

@Injectable({
    providedIn: 'root'
})
export class CreatePostService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  createPost(body: CreatePostRequestModel) {
    return this.http.post(`${this.api_path}/createpost`,body)
  }
}