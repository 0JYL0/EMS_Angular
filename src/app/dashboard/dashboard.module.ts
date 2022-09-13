import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from '../layout/topbar/topbar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';


@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
