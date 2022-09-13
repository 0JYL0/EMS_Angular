import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth-log/auth-log.module').then(x => x.AuthLogModule)
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren:() => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
      }
    ],
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
