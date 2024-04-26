import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexSearchComponent } from './components/kex-search/kex-search.component';
import { KexSearchUserListComponent } from './components/kex-search-user-list/kex-search-user-list.component';
import { KexSearchUserProfileComponent } from './components/kex-search-user-profile/kex-search-user-profile.component';
import {SharedModule} from "../../shared/shared.module";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { KexSearchUserListUserComponent } from './components/kex-search-user-list/kex-search-user-list-user/kex-search-user-list-user.component';
import {MatIcon} from "@angular/material/icon";



@NgModule({
  declarations: [
    KexSearchComponent,
    KexSearchUserListComponent,
    KexSearchUserProfileComponent,
    KexSearchUserListUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinner,
    MatIcon
  ]
})
export class SearchModule { }
