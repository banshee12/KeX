import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexSettingsComponent } from './components/kex-settings/kex-settings.component';
import {CdkDrag, CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";
import { KexSettingsHomeWidgetsComponent } from './components/kex-settings/kex-settings-home-widgets/kex-settings-home-widgets.component';
import { KexSettingsDesignComponent } from './components/kex-settings/kex-settings-design/kex-settings-design.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    KexSettingsComponent,
    KexSettingsHomeWidgetsComponent,
    KexSettingsDesignComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
  ]
})
export class SettingsModule { }
