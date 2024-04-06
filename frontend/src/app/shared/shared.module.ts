import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexNotificationComponent } from './components/kex-notification/kex-notification.component';
import { KexStarRatingComponent } from './components/kex-star-rating/kex-star-rating.component';
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import { KexButtonComponent } from './components/kex-button/kex-button.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import { KexModalComponent } from './components/kex-modal/kex-modal.component';
import { KexModalConfirmationComponent } from './components/kex-modal/kex-modal-confirmation/kex-modal-confirmation.component';
import { KexSearchFieldComponent } from './components/kex-search-field/kex-search-field.component';
import {FormsModule} from "@angular/forms";
import {MatInput, MatSuffix} from "@angular/material/input";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";



@NgModule({
  declarations: [
    KexNotificationComponent,
    KexStarRatingComponent,
    KexButtonComponent,
    KexModalComponent,
    KexModalConfirmationComponent,
    KexSearchFieldComponent
  ],
  exports: [
    KexNotificationComponent,
    KexStarRatingComponent,
    KexButtonComponent,
    KexModalComponent,
    KexModalConfirmationComponent,
    KexSearchFieldComponent
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatTooltip,
    MatProgressSpinner,
    MatMiniFabButton,
    FormsModule,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ]
})
export class SharedModule { }
