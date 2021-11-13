import { Component, OnInit } from '@angular/core';
import GroupResponseModel from 'src/app/model/group/groupResponseModel';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private rankingService: RankingService) { }
  
  ngOnInit(): void {
    this.getGroup()
    
    
  }

  public allGroups: Array<GroupResponseModel> = new Array<GroupResponseModel>()

  async getGroup(): Promise<void> {
    try {
        await this.rankingService.getAllGroup(1).subscribe(async data => {
        this.allGroups = data as  Array<GroupResponseModel>
        this.testchart()
        })
    } catch (error) {
      console.error(error); 
    }
  }

  public  groupsChartData: any;
  public pieOptions:any
  public GroupsName: Array<string> = []
  public GroupsMember: Array<number> = []



  testchart() {
    this.allGroups.forEach(a => {
      this.GroupsName.push(a.name)
      this.GroupsMember.push(a.memberCount)
    })
    this.groupsChartData = {
      labels: this.GroupsName,
      datasets: [
        {
          data: this.GroupsMember,
          backgroundColor: ['#4BE4C5','#2DAF94','#3EC8AC','#C8F6ED','#bad0af','#83af70','#488f31']
        }
      ]
    }
  }
}
