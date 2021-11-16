import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResultResponse} from "../model/ResultResponse";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com"

  constructor(private http: HttpClient) { }

  getGroupById(userId: number, groupId: number) {
    return this.http.get(`${this.api_path}/getgroupbyid?userId=${userId}&groupId=${groupId}`)
  }

  deleteGroup(id: number) {
    return this.http.delete<ResultResponse>(`${this.api_path}/deletegroup?id=${id}`)
  }

  joinGroup(userId: number, groupId: number) {
    return this.http.post(`${this.api_path}/join`, {'groupId': groupId, 'userId': userId})
  }

  leaveGroup(userId: number, groupId: number) {
    return this.http.post(`${this.api_path}/leave`, {'groupId': groupId, 'userId': userId})
  }
}
