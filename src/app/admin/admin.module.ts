import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { RouterModule } from '@angular/router';
import { AllManagerComponent } from './all-manager/all-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllProjectsComponent } from './all-projects/all-projects.component';


@NgModule({
  declarations: [
    AllEmployeesComponent,
    AllManagerComponent,
    AllProjectsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
