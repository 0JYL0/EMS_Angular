import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthGuard, private router:Router) { }

  ngOnInit(): void {
    let tempId = JSON.stringify(localStorage.getItem('EmployeeId'));
    let tempRole = JSON.stringify(localStorage.getItem('Role'));
    let EmployeeId = JSON.parse(tempId);
    let Role = JSON.parse(tempRole);

    console.log(EmployeeId)

    if(EmployeeId != null){
      this.auth.loggedIn = true;
    }
    else{
      this.auth.loggedIn = false; 
      this.router.navigate(['']);
    }
  }

}
