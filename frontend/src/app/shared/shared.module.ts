import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexNotificationComponent } from './components/kex-notification/kex-notification.component';
import { KexStarRatingComponent } from './components/kex-star-rating/kex-star-rating.component';
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    KexNotificationComponent,
    KexStarRatingComponent
  ],
  exports: [
    KexStarRatingComponent,
    KexNotificationComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatTooltip
  ]
})
export class SharedModule { }
