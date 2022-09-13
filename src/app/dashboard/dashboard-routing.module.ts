import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllManagerComponent } from '../admin/all-manager/all-manager.component';
import { AllProjectsComponent } from '../admin/all-projects/all-projects.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'GetAllEmployee',
        // component:AllEmployeesComponent,
        loadChildren:()=> import('../admin/admin.module').then(x=>x.AdminModule)
      },
      {
        path:'GetAllManager',
        component:AllManagerComponent,
        // loadChildren:()=> import('../admin/admin.module').then(x=>x.AdminModule)
      },
      {
        path:'GetAllProjects',
        component:AllProjectsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
