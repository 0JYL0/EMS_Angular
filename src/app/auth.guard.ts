import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  tempId = JSON.stringify(localStorage.getItem('EmployeeId'));
  EmployeeId = JSON.parse(this.tempId);

  public loggedIn : boolean = false;

  canActivate(){

    if(this.EmployeeId != null){
      this.loggedIn = true;
    }

    return this.loggedIn;
  }
  
}
