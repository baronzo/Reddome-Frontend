import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import CreateGroupModel from "../model/group/CreateGroupRequest";

@Injectable({
    providedIn: 'root'
})
export class CreateGroupService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  createGroup(body: CreateGroupModel) {
    return this.http.post(`${this.api_path}/creategroup`, body)
  }

}