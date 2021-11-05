import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import SignupRequestModel from "../model/users/SignupRequestModel";
import SigninRequestModel from "../model/users/SigninRequestModel";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com"

  constructor(private http: HttpClient) {}

  createAccount(body:SignupRequestModel) {
    return this.http.post(`${this.api_path}/register`, body)
  }

  login(body:SigninRequestModel) {
    return this.http.post(`${this.api_path}/login`, body)
  }
}