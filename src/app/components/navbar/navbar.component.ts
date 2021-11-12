import { Component, OnInit } from '@angular/core';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  isOpenSignIn: boolean = false
  isOpenSignUp: boolean = false
  isLogin: boolean = this.getIsLogin()
  
  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.getUserDetails());   
  }

  onClickLogout() {
    this.cookie.set('isLogin', 'false')
    window.location.reload()
  }

  getUserDetails(): SigninRequestModel {
    return JSON.parse(window.localStorage.getItem('user'))
  }

  closeModalandChangeIsOpenSignIn($event:boolean): void {
    this.isOpenSignIn = $event
    this.isOpenSignUp = $event
  }

  onClickSignUp = (): void => {
    this.isOpenSignUp = !this.isOpenSignUp
  }

  notBackToHome(): void {
    if(this.isLogin) {
      this.router.navigateByUrl('/feed')
    } else {
      this.router.navigateByUrl('/')
    }
  }

  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }
  
  onClickSignIn = (): void => {
    this.isOpenSignIn = !this.isOpenSignIn
  }
}
