import { Component, OnInit } from '@angular/core';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store/store.service';
import { UsersService } from 'src/app/services/users.service';
import SignupRequestModel from 'src/app/model/users/SignupRequestModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  isOpenSignIn: boolean = false
  isOpenSignUp: boolean = false
  public userDetail: SignupRequestModel
  
  constructor(
    private cookie: CookieService,
    private router: Router,
    private storeService: StoreService,
    private userService: UsersService
    ) { }
    
  isLogin: boolean = this.storeService.getIsLogin()
  

  ngOnInit(): void {
    this.getLogin()
  }

  async getLogin(): Promise<void> {
    try {
        let userId = window.localStorage.getItem('userId')
        await this.userService.getLogin(JSON.parse(userId).id).subscribe(data => {
          this.userDetail = data as SignupRequestModel
        })
    } catch (error) {
      console.error(error);
    }
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
