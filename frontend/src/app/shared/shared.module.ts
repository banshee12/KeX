import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexNotificationComponent } from './components/kex-notification/kex-notification.component';
import { KexStarRatingComponent } from './components/kex-star-rating/kex-star-rating.component';
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import { KexButtonComponent } from './components/kex-button/kex-button.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatMiniFabButton} from "@angular/material/button";
import { KexModalComponent } from './components/kex-modal/kex-modal.component';
import { KexModalConfirmationComponent } from './components/kex-modal/kex-modal-confirmation/kex-modal-confirmation.component';



@NgModule({
  declarations: [
    KexNotificationComponent,
    KexStarRatingComponent,
    KexButtonComponent,
    KexModalComponent,
    KexModalConfirmationComponent
  ],
  exports: [
    KexStarRatingComponent,
    KexNotificationComponent,
    KexButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatTooltip,
    MatProgressSpinner,
    MatMiniFabButton
  ]
})
export class SharedModule { }
