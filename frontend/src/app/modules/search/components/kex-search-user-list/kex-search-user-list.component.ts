import { Component } from '@angular/core';
import {KexSearchState} from "../../store/kex-search.state";
import {Store} from "@ngrx/store";
import {KexSearchSelector} from "../../store/selectors/kex-search.selectors";
import {KexLoadState} from "../../../../core/models/kex-core.models";
import {Observable} from "rxjs";
import {KexSearchResult} from "../../models/kex-search.model";

@Component({
  selector: 'kex-search-user-list',
  templateUrl: './kex-search-user-list.component.html',
  styleUrl: './kex-search-user-list.component.scss'
})
export class KexSearchUserListComponent {

  constructor(private store : Store<KexSearchState>) {
  }

  get searchResultsLoadState$(): Observable<KexLoadState> {
    return this.store.select(KexSearchSelector.getSearchResultsLoadState);
  }

  get searchResults$(): Observable<KexSearchResult | undefined> {
    return this.store.select(KexSearchSelector.getSearchResults);
  }

  protected readonly KexLoadState = KexLoadState;
}
