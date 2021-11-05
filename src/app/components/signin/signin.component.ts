import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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

  async login(): Promise<void> {
    const body: SigninRequestModel = {
      username: this.signin.username,
      password: this.signin.password
    }
    console.log(body); 
    try {
      if(this.signinform.valid) {
        await this.usersService.login(body).subscribe(data => {
        console.log(data);       
        this.signinform.reset()
        this.isClose = true
        this.router.navigateByUrl('/feed')
      })
      }
    } catch (error) {
      console.error(error);    
    }
  }
}
