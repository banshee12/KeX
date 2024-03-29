import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KexSearchComponent } from './components/kex-search/kex-search.component';
import { KexSearchUserListComponent } from './components/kex-search-user-list/kex-search-user-list.component';
import { KexSearchUserProfileComponent } from './components/kex-search-user-profile/kex-search-user-profile.component';



@NgModule({
  declarations: [
    KexSearchComponent,
    KexSearchUserListComponent,
    KexSearchUserProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
