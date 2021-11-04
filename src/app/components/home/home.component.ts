import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isOpenSignIn: boolean = false
  isOpenSignUp: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onClickSignIn = ():void => {
    this.isOpenSignIn = !this.isOpenSignIn
  }

  closeModalandChangeIsOpenSignIn($event:boolean) {
    this.isOpenSignIn = $event   
  }

  onClickSignUp = () => {
    this.isOpenSignUp = !this.isOpenSignUp
  }

}
