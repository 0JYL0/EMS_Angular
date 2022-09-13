import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err: boolean = false;

  constructor(private api: ApiService, private router: Router, private auth:AuthGuard) { }

  public login = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  })



  loginUser() {

    this.api.loginUser(this.login.value).subscribe
      (res => {
        this.err = false;

        localStorage.setItem('EmployeeId', res.employeeId);
        localStorage.setItem('Role', res.department);

        this.auth.loggedIn = true;

        if (res.department == 1) {
          console.log(localStorage.getItem('EmployeeId'));
          this.api.verifyUser(1);
          this.router.navigate(['/admin']);
        }
        else if(res.department == 2){
          console.log(localStorage.getItem('EmployeeId'));
          this.api.verifyUser(2);
          this.router.navigate(['/admin']);
        }
        else {
          this.api.verifyUser(3);
          this.router.navigate(['/admin']);
        }
      },
        err => {
          this.err = true;
          this.auth.loggedIn = false;
        })
  }

  ngOnInit(): void {
  }

}
