import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import GroupResponseModel from 'src/app/model/group/groupResponseModel';
import { RankingService } from 'src/app/services/ranking.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  
  constructor(private rankingService: RankingService) { } 

  public allGroups: Array<GroupResponseModel> = new Array<GroupResponseModel>()

  ngOnInit(): void { 
    this.getGroup()
  }
  async getGroup(): Promise<void> {
    try {
        await this.rankingService.getAllGroup(1).subscribe(async data => {
        this.allGroups = data as  Array<GroupResponseModel>
        })

    } catch (error) {
      console.error(error); 
    }
  }
}
