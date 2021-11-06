import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import SignupRequestModel from "../model/users/SignupRequestModel";
import SigninRequestModel from "../model/users/SigninRequestModel";

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
  
}