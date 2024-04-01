import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexHomeComponent } from './components/kex-home/kex-home.component';
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {KexSearchFieldComponent} from "../../shared/components/kex-search-field/kex-search-field.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
    declarations: [
        KexHomeComponent
    ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
