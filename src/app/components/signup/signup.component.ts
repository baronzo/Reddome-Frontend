import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/model/calendar';
import { UsersService } from 'src/app/services/users.service';
import SignupRequestModel from 'src/app/model/users/SignupRequestModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public value!: Calendar
  public signup: SignupRequestModel = new SignupRequestModel
  isClose:boolean = false
  changeParentToFalse: boolean = false
  signupform!: FormGroup
  @Output() changeIsOpen = new EventEmitter<boolean>()

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.signupform = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "birth_date": new FormControl(null, Validators.required)
    })
  }

  onCloseTab(): void {
    this.isClose = true
    this.changeIsOpen.emit(this.changeParentToFalse)
  }

  async createAccount(): Promise<void> {
    const body: SignupRequestModel = {
      username: this.signup.username,
      password: this.signup.password,
      email: this.signup.email,
      birth_date: this.value,
      profile_picture: this.signup.profile_picture
    }
    console.log(body);
    try {
        await this.usersService.createAccount(body).subscribe(data => {
          console.log(data);
        })
    } catch (error) {
      console.error(error); 
    }
  }
}
