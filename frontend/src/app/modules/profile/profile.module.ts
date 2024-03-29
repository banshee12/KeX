import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexProfileComponent } from './components/kex-profile/kex-profile.component';
import { KexProfileContactDataComponent } from './components/kex-profile/kex-profile-contact-data/kex-profile-contact-data.component';
import { KexProfileExperienceComponent } from './components/kex-profile/kex-profile-experiences/kex-profile-experience/kex-profile-experience.component';
import { KexProfileExperiencesComponent } from './components/kex-profile/kex-profile-experiences/kex-profile-experiences.component';
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
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    KexProfileComponent,
    KexProfileContactDataComponent,
    KexProfileExperienceComponent,
    KexProfileExperiencesComponent,
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
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule
  ]
})
export class ProfileModule { }
