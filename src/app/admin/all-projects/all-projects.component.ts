import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  public Projects: any = [];
  public Team: any = [];
  public EmployeeDetails: any = [];
  public Name: any;

  Warning: boolean = false;
  insert: boolean = false;
  update: boolean = false;

  error: any;
  msg: any;
  tech: any;
  empError: boolean = false;

  Add: boolean = this.api.Add;
  Edit: boolean = this.api.Edit;
  Remove: boolean = this.api.Remove;
  Manager: boolean = this.api.Manager;
  Employee: boolean = this.api.Employee;


  constructor(private api: ApiService) {
    this.projectData = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      projectTech: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.compose([Validators.required]))
    });
   }

  ngOnInit(): void {
    this.getAllProjects();

    this.Project = { projectId: '' }
  }

  projectData !: FormGroup;

 

  projectTeamData = new FormGroup({
    projectId: new FormControl('', Validators.required),
    employeeId: new FormControl('', Validators.required)
  })


  getAllProjects() {
    this.api.getAllProjects().subscribe((x: any) => {
      this.Projects = [];
      x.forEach((j: any) => {
        this.api.convert(j);
        this.Projects.push(j);
      });
      return x;
    })
  }

  Project: any;

  byId(id: any) {
    this.api.getProjectById(id).subscribe((x: any) => {
      this.tech = x.projectTech;
      this.api.convert(x);
      this.Project = x;
    })
  }

  addProject() {

    if (this.projectData.invalid) {
      this.error = 'Please fill all fields'
      console.log('Error working!')
    }
    else {
      if (this.projectData.value.endDate <= this.projectData.value.startDate) {
        this.error = 'Please check the project\'s end date !'
      }
      else {
        this.api.convertInt(this.projectData);
        console.log(this.projectData.value);
        this.api.addProject(this.projectData.value).subscribe(x => {
          this.getAllProjects();
          return x;
        });
      }

    }

  }

  updateProject() {
    if (this.projectData.invalid) {
      this.error = 'Please fill all fields'
      console.log('Error working!')
    }
    else {
      if (this.projectData.value.endDate <= this.projectData.value.startDate) {
        this.error = 'Please check the project\'s end date !'
      }
      else {
        this.api.convertInt(this.projectData);
        this.api.updateProject(this.projectData.value).subscribe(x => {
          this.getAllProjects();
          this.projectData.reset();
          return x;
        });
      }
    }
  }

  deleteProject(id: any) {
    this.Warning = false;
    this.api.deleteProject(id).subscribe(x => {
      this.getAllProjects();
      return x;
    }, y => {
      this.Warning = true;
      console.log(y);
      return y;
    })
  }

  projectMembers(id: any) {
    this.api.projectMembers(id).subscribe((x: any) => {
      this.Team = [];
      x.forEach((j: any) => { this.api.convert(j); this.Team.push(j); });
    });
  }

  getEmployee(id: any, name: any) {
    this.Name = name;
    this.projectTeamData.controls['projectId'].setValue(id);
    this.api.onlyEmployees().subscribe(x => { this.EmployeeDetails = x; });
  }

  addMember() {
    if (this.projectTeamData.valid) {

      this.api.addProjectMembers(this.projectTeamData.value).subscribe(x => { this.msg = ''; this.empError = false; return x; }, y => { this.msg = ''; this.empError = true; });
    }
    else {
      this.msg = 'Please select employee !'
    }
  }

  removeMember(id: any) {
    this.api.removeProjectMember(id).subscribe(x => { return x; });
  }

  fillData() {

    this.insert = false;
    this.update = true;
    this.projectData = new FormGroup({
      projectId: new FormControl(this.Project.projectId),
      projectName: new FormControl(this.Project.projectName),
      projectDescription: new FormControl(this.Project.projectDescription),
      projectTech: new FormControl(this.tech),
      startDate: new FormControl(this.Project.startDate),
      endDate: new FormControl(this.Project.endDate)
    })
  }

  insertData() {
    this.projectData.reset();
    this.insert = true;
    this.update = false;
  }

}
