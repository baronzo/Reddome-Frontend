import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import SigninRequestModel from "../model/users/SigninRequestModel";

@Injectable({
  providedIn: 'root'
})
export class IsLoginService {
  private readonly _isLogin = new BehaviorSubject<boolean>(true)
  isLogin$: Observable<boolean> = this._isLogin.asObservable()

  constructor(
    private cookie: CookieService
  ) {}

  get isLogin(): boolean {
    return this._isLogin.getValue()
  }

  getIsLogin():boolean {
    return this.cookie.get('isLogin') === 'true'
  }

  setLogin(userDetails: SigninRequestModel): void {
    this.cookie.set('isLogin', 'true')
    window.localStorage.setItem('user', JSON.stringify(userDetails))
  }
}