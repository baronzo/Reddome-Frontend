import { Component, OnInit } from '@angular/core';
import GroupResponseModel from 'src/app/model/group/groupResponseModel';
import { RankingService } from 'src/app/services/ranking.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  
  constructor(
    private rankingService: RankingService,
    private cookie: CookieService,
    private router: Router
    ) { } 

  public allGroups: Array<GroupResponseModel> = new Array<GroupResponseModel>()
  isLogin: boolean = this.getIsLogin()

  ngOnInit(): void { 
    this.getGroup()
    this.backHomeIfNoLogin()
  }

  async getGroup(): Promise<void> {
    try {
        await this.rankingService.getAllGroup(1).subscribe(async data => {
        this.allGroups = this.sortData( data as  Array<GroupResponseModel>)
        console.log(this.allGroups)
        })

    } catch (error) {
      console.error(error);  
    }
  }

  getIsLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

  backHomeIfNoLogin(): void {
    if(!this.isLogin) {
      this.router.navigateByUrl('/')
    }
  }

  sortData(getMember: Array<GroupResponseModel>): Array<GroupResponseModel> {
    return getMember.sort((a, b) => (a.memberCount > b.memberCount ? -1 : 1))
  }

  goToGroup(groupId:number) {
    this.router.navigate(['/group', groupId])
  }
  
}
