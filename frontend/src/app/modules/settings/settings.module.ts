import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexSettingsComponent } from './components/kex-settings/kex-settings.component';
import {CdkDrag, CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";
import { KexSettingsHomeWidgetsComponent } from './components/kex-settings/kex-settings-home-widgets/kex-settings-home-widgets.component';



@NgModule({
  declarations: [
    KexSettingsComponent,
    KexSettingsHomeWidgetsComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
  ]
})
export class SettingsModule { }
