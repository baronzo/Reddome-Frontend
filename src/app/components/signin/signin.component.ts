import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';
import SigninResponseModel from 'src/app/model/users/SigninResponseModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResultResponse } from 'src/app/model/ResultResponse';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isClose: boolean = false
  changeParentToFalse: boolean = false
  public signin: SigninRequestModel = new SigninRequestModel
  signinform!: FormGroup
  @Output() changeIsOpen = new EventEmitter<boolean>()
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    private cookie: CookieService,
    private storeService: StoreService
    ) { }
    
  isLogin: boolean = this.storeService.getIsLogin()

  ngOnInit(): void {
    this.signinform = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  onCloseTab(): void {
    this.isClose = true
    this.changeIsOpen.emit(this.changeParentToFalse)
  }
  
  setUserId(userId: any): void {
    window.localStorage.setItem('userId', JSON.stringify(userId))
  }

  async login(): Promise<void> {
    const body: SigninRequestModel = {
      username: this.signin.username,
      password: this.signin.password
    }
    try {
      if(this.signinform.valid) {
        await this.usersService.login(body).subscribe((data) => { 
        let result = data as ResultResponse
        if(result.status === 'fail') {
          this.storeService.alertError('Username or password incorrect')
        } else {
          this.storeService.setLogin(body)
          this.signinform.reset()
          this.isClose = true
          window.location.href = '/feed'
          this.setUserId(data)
        }
      })
      }
    } catch (error) {
      console.error(error);    
    }
  }
}
