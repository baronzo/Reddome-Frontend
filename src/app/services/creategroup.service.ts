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

  uploadImage(imageBase64: string) {
    const url: string = 'https://api.imgbb.com/1/upload?expiration=604800&key=a95920be3353326a435d406572028a6c'
    const formData: FormData = new FormData()
    formData.append('image', imageBase64)
    return this.http.post(url, formData)
  }
}
