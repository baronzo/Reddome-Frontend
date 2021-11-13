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
    this.testchart()
  }

  public allGroups: Array<GroupResponseModel> = new Array<GroupResponseModel>()

  async getGroup(): Promise<void> {
    try {
        await this.rankingService.getAllGroup(1).subscribe(async data => {
        this.allGroups = data as  Array<GroupResponseModel>
        })

    } catch (error) {
      console.error(error); 
    }
  }
  
    //======================================
    employeeOrgData: any; orgCount1: any;
    orgCount2: any; orgCount3: any; orgCount4: any; orgCount5: any; 
    employeeLabel: any;
  
    
    employeeOrganizationData = [
      { name: 'employee1', designation: 'manager', employer: 'organization1' },
      { name: 'employee2', designation: 'manager', employer: 'organization1' },
      { name: 'employee3', designation: 'manager', employer: 'organization1' },
      { name: 'employee4', designation: 'manager', employer: 'organization1' },
      { name: 'employee5', designation: 'manager', employer: 'organization2' },
      { name: 'employee6', designation: 'manager', employer: 'organization2' },
      { name: 'employee7', designation: 'manager', employer: 'organization2' },
      { name: 'employee8', designation: 'manager', employer: 'organization3' },
      { name: 'employee9', designation: 'manager', employer: 'organization3' },
      { name: 'employee10', designation: 'manager', employer: 'organization3' },
      { name: 'employee11', designation: 'manager', employer: 'organization3' },
      { name: 'employee12', designation: 'manager', employer: 'organization3' },
      { name: 'employee13', designation: 'manager', employer: 'organization3' },
      { name: 'employee14', designation: 'manager', employer: 'organization3' },
      { name: 'employee15', designation: 'manager', employer: 'organization4' },
      { name: 'employee16', designation: 'manager', employer: 'organization4' },
      { name: 'employee17', designation: 'manager', employer: 'organization5' },
      { name: 'employee18', designation: 'manager', employer: 'organization5' },
      { name: 'employee19', designation: 'manager', employer: 'organization5' },
      { name: 'employee20', designation: 'manager', employer: 'organization5' },
      { name: 'employee21', designation: 'manager', employer: 'organization5' }
    ]



  testchart() {
    this.orgCount1 = this.employeeOrganizationData.filter(emp => emp.employer === 'organization1').length;
    this.orgCount2 = this.employeeOrganizationData.filter(emp => emp.employer === 'organization2').length;
    this.orgCount3 = this.employeeOrganizationData.filter(emp => emp.employer === 'organization3').length;
    this.orgCount4 = this.employeeOrganizationData.filter(emp => emp.employer === 'organization4').length;
    this.orgCount5 = this.employeeOrganizationData.filter(emp => emp.employer === 'organization5').length;
    this.employeeLabel =

      this.employeeOrganizationData.map(emp => emp.employer)
        .filter((value, index, self) => self.indexOf(value) === index);

    this.employeeOrgData = {
      labels: this.employeeLabel,
      datasets: [
        {
          data: [this.orgCount1, this.orgCount2, this.orgCount3, this.orgCount4, this.orgCount5],
          backgroundColor: ['#ff0000', '#0000FF', '#FFFF00', '#FFC0CB', '#7f00ff ']
        }
      ]
    }
  }

}
