import { Component, OnInit } from '@angular/core';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  isOpenSignIn: boolean = false
  isOpenSignUp: boolean = false
  
  constructor(
    private cookie: CookieService,
    private router: Router,
    private storeService: StoreService
    ) { }
    
  isLogin: boolean = this.storeService.getIsLogin()

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
  
  onClickSignIn = (): void => {
    this.isOpenSignIn = !this.isOpenSignIn
  }
}
