import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {KexButtonType, KexLoadState, KexUserDetails, User} from "../../../../core/models/kex-core.models";
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../store/kex-search.state";
import {KexSearchSelector} from "../../store/selectors/kex-search.selectors";
import {GetUserProfileActions} from "../../store/actions/kex-search.actions";


@Component({
  selector: 'kex-search-user-profile',
  templateUrl: './kex-search-user-profile.component.html',
  styleUrl: './kex-search-user-profile.component.scss'
})
export class KexSearchUserProfileComponent implements OnInit{
  @Input() userId: string | undefined;


  constructor(private store: Store<KexSearchState>) {
  }



  get userProfile$(): Observable<KexUserDetails  | undefined> {
    return this.store.select(KexSearchSelector.getUserProfile);
  }

  get userProfileLoadState$(): Observable<KexLoadState> {
    return this.store.select(KexSearchSelector.getUserProfileLoadState);
  }

  get searchResultsLoadState$(): Observable<KexLoadState> {
    return this.store.select(KexSearchSelector.getSearchResultsLoadState);
  }

  protected readonly KexLoadState = KexLoadState;

  ngOnInit(): void {
    if (this.userId) {
      this.store.dispatch(GetUserProfileActions.do({userId: this.userId}));
    }
  }






}
