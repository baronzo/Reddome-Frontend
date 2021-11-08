import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';
import SigninResponseModel from 'src/app/model/users/SigninResponseModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isClose: boolean = false
  isLogin: boolean = this.getIsLogin()
  changeParentToFalse: boolean = false
  public signin: SigninRequestModel = new SigninRequestModel
  signinform!: FormGroup
  @Output() changeIsOpen = new EventEmitter<boolean>()

  constructor(
    private usersService: UsersService,
    private router: Router,
    private cookie: CookieService
    ) { }

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

  setLogin(userDetails: SigninRequestModel): void {
    this.cookie.set('isLogin', 'true')
    window.localStorage.setItem('user', JSON.stringify(userDetails))
  }

  setUserId(userId: any): void {
    window.localStorage.setItem('userId', JSON.stringify(userId))
  }
  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

  async login(): Promise<void> {
    const body: SigninRequestModel = {
      username: this.signin.username,
      password: this.signin.password
    }
    console.log(body); 
    try {
      if(this.signinform.valid) {
        await this.usersService.login(body).subscribe((data: any) => { 
        if(data.status === 'fail') {
          this.alertError()
        } else {
          this.setLogin(body)
          this.signinform.reset()
          this.isClose = true
          this.router.navigateByUrl('/feed')
          this.setUserId(data)
        }
      })
      }
    } catch (error) {
      console.error(error);    
    }
  }

  alertError(): void {
    Swal.fire(
      'Login Error',
      'Username or password incorrect',
      'error'
    )
  } 
}
