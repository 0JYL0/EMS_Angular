import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {

  public Employees: any = [];
  Emp_Name:any;

  insert:boolean=false;
  update:boolean=false;
  email:boolean=false;
  success:boolean=false;
  delete:boolean=false;

  role:any;
  department:any;
  tech:any;

  tempId = JSON.stringify(sessionStorage.getItem('EmployeeId'));
  tempRole = JSON.stringify(sessionStorage.getItem('Role'));
  EmployeeId = JSON.parse(this.tempId);
  Role = JSON.parse(this.tempRole);

  constructor(private api: ApiService, private router: Router) { }


  Add:boolean = this.api.Add;
  Edit:boolean = this.api.Edit;
  Remove:boolean = this.api.Remove;
  Manager:boolean = this.api.Manager;


  employeeData = new FormGroup({
    employeeName: new FormControl('', Validators.compose([Validators.required])),
    employeeAddress: new FormControl(''),
    employeeEmail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    employeeJoiningDate: new FormControl('', Validators.compose([Validators.required])),
    employeeExperience: new FormControl('', Validators.required),
    role: new FormControl('', Validators.compose([Validators.required])),
    department: new FormControl('', Validators.compose([Validators.required])),
    technology: new FormControl('', Validators.compose([Validators.required])),
  })

  ngOnInit(): void {
    this.getAllEmployee();
    this.Employee = { employeeName: '', }
  }


  Employee: any;

  err: any = '';


  getAllEmployee() {
    this.api.getAllEmployee().subscribe(x => {

      this.Employees = [];
      x.forEach((j: any) => {
        this.api.convert(j);
        if(this.Role == 3){
          if(j.employeeId == this.EmployeeId){
            // this.api.convert(j);
            this.Employees.push(j);
          }
        }
        else if(this.Role == 2){
          if(j.department != 1){
            this.Employees.push(j);
          }
        }
        else{
          this.Employees.push(j); 
        }
        
      });
    });
  }

  byID(id: any) {
    this.api.getEmployeeById(id).subscribe(j => {
      this.role = j.role;
      this.department = j.department;
      this.tech = j.technology;
      this.api.convert(j);
      this.Employee = j;
      this.Employee.employeeJoiningDate.toString('dd-MM-yyyy');
    })
  }

  addEmployee() {
    if (this.employeeData.invalid) {
      this.err = 'Invalid data entries'
    }
    else {
      this.err = '';
      this.api.convertInt(this.employeeData);
      this.api.addEmployee(this.employeeData.value).subscribe(x => {
        this.employeeData.reset();
        // this.success = true;
        this.email = false;
        this.getAllEmployee();
        document.getElementById('closed')?.click();
      },
      y => {
        this.success = false;
        this.email = true;
      });
    }
  }

  updateEmployee() {
    this.api.convertInt(this.employeeData);
    this.api.updateEmployee(this.employeeData.value).subscribe(x => {
      this.getAllEmployee();
      return x;
    })
  }

  deleteEmployee(id: any,name : any) {
    this.api.deleteEmployee(id).subscribe(x => {
      this.delete = false;
      this.getAllEmployee();
      return x;
    },
    y =>{
      this.Emp_Name = name;
      this.delete = true;
    })
  }

  insertData(){
    this.employeeData.reset();
    this.insert = true;
    this.update = false;
  }

  fillData() {

    this.employeeData = new FormGroup({
      employeeId: new FormControl(this.Employee.employeeId),
      employeeName: new FormControl(this.Employee.employeeName),
      employeeAddress: new FormControl(this.Employee.employeeAddress),
      employeeEmail: new FormControl(this.Employee.employeeEmail),
      password: new FormControl(this.Employee.password),
      employeeJoiningDate: new FormControl(this.Employee.employeeJoiningDate),
      employeeExperience: new FormControl(this.Employee.employeeExperience),
      role: new FormControl(this.role),
      department: new FormControl(this.department),
      technology: new FormControl(this.tech),
    })
    this.update = true;
    this.insert = false;
  }
}
