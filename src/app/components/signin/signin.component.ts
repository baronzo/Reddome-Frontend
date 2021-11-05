import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isClose:boolean = false
  changeParentToFalse: boolean = false
  @Output() changeIsOpen = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  onCloseTab(): void {
    this.isClose = true
    this.changeIsOpen.emit(this.changeParentToFalse)
  }

}
