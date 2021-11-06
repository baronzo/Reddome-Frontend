import { Component, Input, OnInit } from '@angular/core';
import  ResponsePostByIdModel from '../../model/postModel/ResponsePostById';



@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.scss']
})
export class PostfeedComponent implements OnInit {

  @Input() post: ResponsePostByIdModel

  constructor() { }

  ngOnInit(): void {
    console.log(this.post);
    
  }

}
