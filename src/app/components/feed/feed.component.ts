import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {

  isLogin: boolean = this.getIsLogin()

  constructor(
    private cookie: CookieService,
    private router: Router
    ) {
   }

  ngOnInit(): void {
    this.backHomeIfNoLogin()
  }

  backHomeIfNoLogin(): void {
    if(this.isLogin === false) {
      this.router.navigateByUrl('/')
    }
  }

  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

}
