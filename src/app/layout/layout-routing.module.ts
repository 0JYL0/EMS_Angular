import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';

const routes: Routes = [
  {
    path:'',
    component:TopbarComponent
  },
  {
    path:'GetAllEmployee',
    children:[{
      
      loadChildren: () => import('../admin/admin.module').then(x => x.AdminModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
