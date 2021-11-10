import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  isTest: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  onChange(): void {
    this.isTest = !this.isTest
  }

}
