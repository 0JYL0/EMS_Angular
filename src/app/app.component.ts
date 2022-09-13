import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/api.service';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EMS_DashBoard';
  
  constructor(private api:ApiService, private auth:AuthGuard, private router:Router) { }

  ngOnInit(): void {

    let tempId = JSON.stringify(localStorage.getItem('EmployeeId'));
    let tempRole = JSON.stringify(localStorage.getItem('Role'));
    let EmployeeId = JSON.parse(tempId);
    let Role = JSON.parse(tempRole);

    console.log(EmployeeId)

    if(EmployeeId != null){
      this.auth.loggedIn = true;
      this.api.verifyUser(Role);
    }
    else{
      this.auth.loggedIn = false; 
      this.router.navigate(['']);
    }

  }
}
