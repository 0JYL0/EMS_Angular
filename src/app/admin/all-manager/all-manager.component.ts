import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-manager',
  templateUrl: './all-manager.component.html',
  styleUrls: ['./all-manager.component.scss']
})
export class AllManagerComponent implements OnInit {

  public Managers: any = [];
  public Name:any;
  public Team: any = [];
  public EmployeeDetails: any = [];

  Manager:boolean = this.api.Manager;

  tempId = JSON.stringify(localStorage.getItem('EmployeeId'));
  tempRole = JSON.stringify(localStorage.getItem('Role'));
  EmployeeId = JSON.parse(this.tempId);
  Role = JSON.parse(this.tempRole);
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getManagers();
  }

  teamData = new FormGroup({
    managerId: new FormControl(''),
    employeeId: new FormControl('')
  })

  getManagers(){
    this.api.getAllManager().subscribe((x:any) => {
      x.forEach((j: any) => { 
        if(this.Role != 2){
          this.api.convert(j);
          this.Managers.push(j); 
        }
        else{
          if(j.employeeId == this.EmployeeId){
            this.api.convert(j);
            this.Managers.push(j);
          }
        }
        
      });
     });
  }

  getTeam(id : any){
    this.api.teamMembers(id).subscribe((x:any) => {
      this.Team=[];
      x.forEach((j: any) => { this.api.convert(j); this.Team.push(j); });
    });
  }

  getEmployee(id:any, name:any){
    this.Name = name;
    this.teamData.controls['managerId'].setValue(id);
    this.api.onlyEmployees().subscribe(x => { this.EmployeeDetails = x; });
  }

  addMember(){
    this.api.addMember(this.teamData.value).subscribe(x => {return x;});
  }

  removeMember(id : any){
    this.api.removeMember(id).subscribe( x => { return x; } );
  }

}
