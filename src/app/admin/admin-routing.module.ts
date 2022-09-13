import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeesComponent } from './all-employees/all-employees.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:AllEmployeesComponent,
      },
  ],
  },
  // {
  //   path:'/GetAllEmployee',
  //   component:AllEmployeesComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
