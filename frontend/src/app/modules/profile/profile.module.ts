import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexProfileComponent } from './components/kex-profile/kex-profile.component';
import { KexProfileContactDataComponent } from './components/kex-profile/kex-profile-contact-data/kex-profile-contact-data.component';
import { KexProfileExperienceComponent } from './components/kex-profile/kex-profile-experience/kex-profile-experience.component';
import { KexProfileSkillsComponent } from './components/kex-profile/kex-profile-skills/kex-profile-skills.component';
import { KexProfileSkillComponent } from './components/kex-profile/kex-profile-skills/kex-profile-skill/kex-profile-skill.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    KexProfileComponent,
    KexProfileContactDataComponent,
    KexProfileExperienceComponent,
    KexProfileSkillsComponent,
    KexProfileSkillComponent
  ],
  imports: [
    CommonModule,
    MatTab,
    MatTabGroup,
    MatProgressSpinner,
    MatIcon,
    SharedModule,
    MatMiniFabButton,
    MatTooltip,
    MatButton,
    MatFormField,
    MatInput,
    FormsModule,
  ]
})
export class ProfileModule { }
