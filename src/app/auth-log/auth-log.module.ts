import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLogRoutingModule } from './auth-log-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthLogRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthLogModule { }
