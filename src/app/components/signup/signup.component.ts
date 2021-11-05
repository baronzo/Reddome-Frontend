import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/model/calendar';
import { SignupService } from 'src/app/services/signup.service';
import SignupRequestModel from 'src/app/model/users/SignupRequestModel';

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
  @Output() changeIsOpen = new EventEmitter<boolean>()

  constructor(
    private signupService: SignupService
  ) { 
    
  }

  ngOnInit(): void {
  
  }

  onCloseTab(): void {
    this.isClose = true
    this.changeIsOpen.emit(this.changeParentToFalse)
  }

  createAccount() {
    const body: SignupRequestModel = {
      username: this.signup.username,
      password: this.signup.password,
      email: this.signup.email,
      birth_date: this.value,
      profile_picture: ""
    }
    console.log(body);
    try {
      this.signupService.createAccount(body).subscribe(data => {
        console.log(data);
      })  
    } catch (error) {
      console.error(error); 
    }
  }

}
