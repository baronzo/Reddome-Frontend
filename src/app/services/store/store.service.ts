import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import SigninRequestModel from "../../model/users/SigninRequestModel";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
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

  async alertSuccess(text: string) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Fantastic!',
      }).then(result => {
        resolve(result.isConfirmed)
      })
    })
  }

  async alertWarning(text: string) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Warning!',
        text: text,
        icon: 'warning',
        confirmButtonText: 'Okay!',
      }).then(result => {
        resolve(result.isConfirmed)
      })
    })
  }

  async alertError(text: string) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Fail!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Try again!',
      }).then(result => {
        resolve(result.isConfirmed)
      })
    })
  }
}