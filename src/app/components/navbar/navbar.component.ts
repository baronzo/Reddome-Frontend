import { Component, OnInit } from '@angular/core';
import SigninRequestModel from 'src/app/model/users/SigninRequestModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.getUserDetails());   
  }

  getUserDetails(): SigninRequestModel {
    return JSON.parse(window.localStorage.getItem('user'))
  }

}
