import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsLoginService {
  private readonly _isLogin = new BehaviorSubject<boolean>(true)
  readonly isLogin$ = this._isLogin.asObservable()

  get isLogin(): boolean {
    return this._isLogin.getValue()
  }

  private set setLogin(value: boolean) {
    this._isLogin.next(value)
  }

  changeIsLogin(value: boolean):boolean {
    return this.setLogin = value
  }
}