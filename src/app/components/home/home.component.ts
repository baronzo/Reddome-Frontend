import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSignIn: boolean = false
  isSignUp: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onClickSignIn = () => {
    this.isSignIn = !this.isSignIn
  }

  onClickSignUp = () => {
    this.isSignUp = true
  }

}
