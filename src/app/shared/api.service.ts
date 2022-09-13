import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public Admin = 'https://localhost:44379/Admin/';

  constructor(private http:HttpClient) { }

  Add:boolean = false;
  Edit:boolean = false;
  Remove:boolean = false;
  Manager:boolean = false;
  Employee:boolean = false;


  verifyUser(Department:any){
    if(Department == 1){
      this.Add= true;
      this.Edit = true;
      this.Remove = true;
      this.Manager = true;
      this.Employee = true;
    }
    else if(Department == 2){
      this.Add= false;
      this.Edit = false;
      this.Remove = false;
      this.Manager = true;
      this.Employee = true; 
    }
    else{
      this.Add= false;
      this.Edit = false;
      this.Remove = false;
      this.Manager = false;
      this.Employee = true; 
    }
  }

  loginUser(data : any){
    return this.http.post('https://localhost:44379/Authenticate/AuthenticateUser', data).pipe(map((res : any) => { console.log(res); return res; }));
  }

  getAllEmployee(){
    return this.http.get(this.Admin + 'GetAllEmployeeDetails').pipe(map((res : any) => { return res; }));
  }

  getEmployeeById(id : any){
    return this.http.get(this.Admin + 'GetEmployeeById?id=' + id).pipe(map((res : any) => { return res; }));
  }

  getAllManager(){
    return this.http.get(this.Admin + 'GetAllManager').pipe(map((res => { return res; })));
  }

  addEmployee(data : any){
    return this.http.post(this.Admin + 'AddEmployee/',  data).pipe(map((res => { return res; })));
  }

  deleteEmployee(id : any){
    return this.http.delete(this.Admin + 'DeleteEmployee?id=' + id).pipe(map((res => { return res; })));
  }

  updateEmployee(data : any){
    return this.http.put(this.Admin + 'UpdateEmployee/', data).pipe(map((res => { return res; })));
  }

  getAllProjects(){
    return this.http.get(this.Admin + 'GetAllProject').pipe(map((res => { return res; })));
  }

  getProjectById(id : any){
    return this.http.get(this.Admin + 'GetProjectById?id=' + id).pipe(map((res => { return res; })));
  }

  addProject(data : any){
    return this.http.post(this.Admin + 'AddProject/', data).pipe(map((res => { return res; })));
  }

  updateProject(data : any){
    return this.http.put(this.Admin + 'UpdateProject/', data).pipe(map((res => { return res; })));
  }

  deleteProject(id : any){
    return this.http.delete(this.Admin + 'DeleteProject?id=' + id).pipe(map((res => { return res; })));
  }

  teamMembers(id : any){
    return this.http.get(this.Admin + 'TeamMembers?id=' + id).pipe(map((res =>{ return res; })));
  }

  onlyEmployees(){
    return this.http.get(this.Admin + 'OnlyEmployee').pipe(map((res => { return res; })));
  }

  addMember(data : any){
    return this.http.post(this.Admin + 'AddMember/', data).pipe(map((res => { return res; })));
  }

  projectMembers(id : any){
    return this.http.get(this.Admin + 'ProjectMembers?id=' + id).pipe(map((res => { return res; })));
  }

  addProjectMembers(data :  any){
    return this.http.post(this.Admin + 'AddProjectMembers', data).pipe(map((res => { return res; })));
  }

  removeMember(id : any){
    return this.http.delete(this.Admin + 'RemoveMember?id=' + id).pipe(map((res => { return res; })));
  }

  removeProjectMember(id : any){
    return this.http.delete(this.Admin + 'RemoveProjectMember?id=' + id).pipe(map((res => { return res; })));
  }

  convert(j : any){

      if (j.department == 1) { j.department = 'Admin'; }
      else if (j.department == 2) { j.department = 'Manager'; }
      else { j.department = 'Employee'; }

      if (j.role == 1) { j.role = 'Project Manager'; }
      else if (j.role == 2) { j.role = 'Senior Developer'; }
      else { j.role = 'Junior Developer'; }

      if (j.technology == 1) { j.technology = 'Microsoft Tech'; }
      else if (j.technology == 2) { j.technology = 'Java'; }
      else { j.technology = 'Python'; }

      if (j.projectTech == 1) { j.projectTech = 'Microsoft Tech'; }
      else if (j.projectTech == 2) { j.projectTech = 'Java'; }
      else { j.projectTech = 'Python'; }

  }

  convertInt(obj : any){
    if(obj.value.role == '1'){ obj.value.role = 1 }
    else if(obj.value.role == '2'){ obj.value.role = 2 }
    else { obj.value.role = 3 }
    
    if(obj.value.department == '1'){ obj.value.department = 1 }
    else if(obj.value.department == '2'){ obj.value.department = 2 }
    else { obj.value.department = 3 }
    
    if(obj.value.technology == '1'){ obj.value.technology = 1 }
    else if(obj.value.technology == '2'){ obj.value.technology = 2 }
    else { obj.value.technology = 3 }

    if(obj.value.projectTech == '1'){ obj.value.projectTech = 1 }
    else if(obj.value.projectTech == '2'){ obj.value.projectTech = 2 }
    else { obj.value.projectTech = 3 }
  }
}