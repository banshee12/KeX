import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexHomeComponent } from './components/kex-home/kex-home.component';
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    KexHomeComponent
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatInput,
    FormsModule
  ]
})
export class HomeModule { }
