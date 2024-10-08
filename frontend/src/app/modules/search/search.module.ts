import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexSearchComponent } from './components/kex-search/kex-search.component';
import { KexSearchUserListComponent } from './components/kex-search-user-list/kex-search-user-list.component';
import { KexSearchUserProfileComponent } from './components/kex-search-user-profile/kex-search-user-profile.component';
import {SharedModule} from "../../shared/shared.module";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { KexSearchUserListUserComponent } from './components/kex-search-user-list/kex-search-user-list-user/kex-search-user-list-user.component';
import {MatIcon} from "@angular/material/icon";
import { KexUserDetailsSkillsComponent } from './components/kex-search-user-profile/kex-user-details-skills/kex-user-details-skills.component';
import { KexUserDetailsExperiencesComponent } from './components/kex-search-user-profile/kex-user-details-experiences/kex-user-details-experiences.component';
import { KexUserDetailsSkillComponent } from './components/kex-search-user-profile/kex-user-details-skills/kex-user-details-skill/kex-user-details-skill.component';
import {MatChip, MatChipSet} from "@angular/material/chips";
import {
  KexUserDetailsExperienceComponent
} from "./components/kex-search-user-profile/kex-user-details-experiences/kex-user-details-experience/kex-user-details-experience.component";
import { KexSearchUserProfileContactDataComponent } from './components/kex-search-user-profile/kex-search-user-profile-contact-data/kex-search-user-profile-contact-data.component';
import {MatCheckbox} from "@angular/material/checkbox";
import { KexUserProfileComponent } from './components/kex-user-profile/kex-user-profile.component';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import { KexSearchUserProfileFavoriteButtonComponent } from './components/kex-search-user-profile/kex-search-user-profile-favorite-button/kex-search-user-profile-favorite-button.component';



@NgModule({
  declarations: [
    KexSearchComponent,
    KexSearchUserListComponent,
    KexSearchUserProfileComponent,
    KexSearchUserListUserComponent,
    KexUserDetailsSkillsComponent,
    KexUserDetailsExperiencesComponent,
    KexUserDetailsSkillComponent,
    KexUserDetailsExperienceComponent,
    KexSearchUserProfileContactDataComponent,
    KexUserProfileComponent,
    KexSearchUserProfileFavoriteButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinner,
    MatIcon,
    MatChipSet,
    MatChip,
    MatCheckbox,
    MatButton,
    MatDivider
  ]
})
export class SearchModule { }
