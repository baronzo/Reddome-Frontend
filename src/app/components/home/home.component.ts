import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isOpenSignIn: boolean = false
  isOpenSignUp: boolean = false
  isLogin: boolean = this.getIsLogin()

  constructor(
    private cookie: CookieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.notBackToHome()
  }

  onClickSignIn = ():void => {
    this.isOpenSignIn = !this.isOpenSignIn
  }

  notBackToHome() {
    if(this.isLogin) {
      this.router.navigateByUrl('/feed')
    } else {
      this.router.navigateByUrl('/')
    }
  }

  closeModalandChangeIsOpenSignIn($event:boolean) {
    this.isOpenSignIn = $event
    this.isOpenSignUp = $event  
  }

  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

  onClickSignUp = () => {
    this.isOpenSignUp = !this.isOpenSignUp
  }

}
