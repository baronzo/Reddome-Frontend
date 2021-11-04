import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import SignupRequestModel from "../model/users/SignupRequestModel";

@Injectable({
    providedIn: 'root'
})
export class SignupService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  api_path:string = "http://jrapbit.pythonanywhere.com/register"

  constructor(private http: HttpClient) {}

  createAccount(body:SignupRequestModel): Observable<any> {
    return this.http.post(this.api_path, body)
  }
}