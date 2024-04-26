import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {KexLoadState, User} from "../../../../core/models/kex-core.models";
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../store/kex-search.state";
import {KexSearchSelector} from "../../store/selectors/kex-search.selectors";

@Component({
  selector: 'kex-search-user-profile',
  templateUrl: './kex-search-user-profile.component.html',
  styleUrl: './kex-search-user-profile.component.scss'
})
export class KexSearchUserProfileComponent {

  constructor(private store : Store<KexSearchState>) {
  }
  get userProfile$() : Observable<User | undefined> {
    return this.store.select(KexSearchSelector.getUserProfile);
  }

  get userProfileLoadState$() : Observable<KexLoadState> {
    return this.store.select(KexSearchSelector.getUserProfileLoadState);
  }

  protected readonly KexLoadState = KexLoadState;
}
