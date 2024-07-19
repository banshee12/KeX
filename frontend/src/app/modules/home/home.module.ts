import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexHomeComponent } from './components/kex-home/kex-home.component';
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {KexSearchFieldComponent} from "../../shared/components/kex-search-field/kex-search-field.component";
import {SharedModule} from "../../shared/shared.module";
import { KexWidgetSkillsComponent } from './components/widgets/kex-widget-skills/kex-widget-skills.component';
import { KexWidgetExperienceComponent } from './components/widgets/kex-widget-experience/kex-widget-experience.component';
import { KexWidgetContactDataComponent } from './components/widgets/kex-widget-contact-data/kex-widget-contact-data.component';
import { KexWidgetBaseComponent } from './components/widgets/kex-widget-base/kex-widget-base.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatList, MatListItem} from "@angular/material/list";
import { KexWidgetFeedbackComponent } from './components/widgets/kex-widget-feedback/kex-widget-feedback.component';



@NgModule({
    declarations: [
        KexHomeComponent,
        KexWidgetSkillsComponent,
        KexWidgetExperienceComponent,
        KexWidgetContactDataComponent,
        KexWidgetBaseComponent,
        KexWidgetFeedbackComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatDivider,
    MatButton,
    MatCardTitle,
    MatProgressSpinner,
    MatList,
    MatListItem,
  ]
})
export class HomeModule { }
